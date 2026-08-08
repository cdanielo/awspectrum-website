import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { RegistrationStatus, EventStatus, Prisma } from '@prisma/client';
import { RegistrationService } from './registration.service';
import { RegistrationRepository } from './registration.repository';
import { EventRepository } from '../event/event.repository';
import { NotificationsService } from '../notifications/notifications.service';

describe('RegistrationService', () => {
  let service: RegistrationService;

  const mockRegistrationRepository = {
    create: jest.fn(),
    createWithCapacityControl: jest.fn(),
    findById: jest.fn(),
    findMany: jest.fn(),
    countByEvent: jest.fn(),
    countByEventAndStatus: jest.fn(),
    update: jest.fn(),
  };

  const mockEventRepository = {
    findById: jest.fn(),
  };

  const mockNotificationsService = {
    sendConfirmation: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        { provide: RegistrationRepository, useValue: mockRegistrationRepository },
        { provide: EventRepository, useValue: mockEventRepository },
        { provide: NotificationsService, useValue: mockNotificationsService },
      ],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const validDto = { role: 'ATTENDEE' as any, name: 'Test', email: 'test@test.com' };

    it('should throw NotFoundException when event does not exist', async () => {
      mockEventRepository.findById.mockResolvedValue(null);

      await expect(service.create('nonexistent', validDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when event is not published', async () => {
      mockEventRepository.findById.mockResolvedValue({ id: '1', status: EventStatus.DRAFT });

      await expect(service.create('1', validDto)).rejects.toThrow(BadRequestException);
    });

    it('should create a confirmed registration', async () => {
      mockEventRepository.findById.mockResolvedValue({ id: '1', status: EventStatus.PUBLISHED, capacity: null });
      mockRegistrationRepository.create.mockResolvedValue({ id: 'r1', status: RegistrationStatus.CONFIRMED });
      mockNotificationsService.sendConfirmation.mockResolvedValue(undefined);

      const result = await service.create('1', validDto);
      expect(result).toHaveProperty('id');
      expect(mockNotificationsService.sendConfirmation).toHaveBeenCalledWith('r1');
    });

    it('should create a waitlisted registration when at capacity', async () => {
      mockEventRepository.findById.mockResolvedValue({ id: '1', status: EventStatus.PUBLISHED, capacity: 1 });
      mockRegistrationRepository.createWithCapacityControl.mockResolvedValue({ id: 'r2', status: RegistrationStatus.WAITLISTED });

      const result = await service.create('1', validDto);
      expect(result).toBeDefined();
      expect(mockRegistrationRepository.createWithCapacityControl).toHaveBeenCalledWith(
        '1',
        1,
        expect.objectContaining({ role: 'ATTENDEE', name: 'Test', email: 'test@test.com' }),
      );
      expect(mockNotificationsService.sendConfirmation).not.toHaveBeenCalled();
    });

    it('should throw ConflictException on duplicate', async () => {
      mockEventRepository.findById.mockResolvedValue({ id: '1', status: EventStatus.PUBLISHED, capacity: null });
      const prismaError = new Prisma.PrismaClientKnownRequestError('Unique constraint violation', {
        code: 'P2002',
        clientVersion: '5',
      });
      mockRegistrationRepository.create.mockRejectedValue(prismaError);

      await expect(service.create('1', validDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('updateStatus', () => {
    it('should throw NotFoundException when registration does not exist', async () => {
      mockRegistrationRepository.findById.mockResolvedValue(null);

      await expect(service.updateStatus('nonexistent', RegistrationStatus.CONFIRMED)).rejects.toThrow(NotFoundException);
    });

    it('should update status', async () => {
      mockRegistrationRepository.findById.mockResolvedValue({ id: 'r1', status: RegistrationStatus.PENDING });
      mockRegistrationRepository.update.mockResolvedValue({ id: 'r1', status: RegistrationStatus.CONFIRMED });

      const result = await service.updateStatus('r1', RegistrationStatus.CONFIRMED);
      expect(result.status).toBe(RegistrationStatus.CONFIRMED);
    });
  });
});
