import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { EventService } from './event.service';
import { EventRepository } from './event.repository';

describe('EventService', () => {
  let service: EventService;
  let repository: EventRepository;

  const mockRepository = {
    findMany: jest.fn(),
    count: jest.fn(),
    findBySlug: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventService,
        { provide: EventRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    repository = module.get<EventRepository>(EventRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllPublished', () => {
    it('should return paginated published events', async () => {
      const events = [{ id: '1', title: 'Test Event' }];
      mockRepository.findMany.mockResolvedValue(events);
      mockRepository.count.mockResolvedValue(1);

      const result = await service.findAllPublished({ page: 1, limit: 10 });

      expect(result.data).toEqual(events);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });
  });

  describe('findBySlug', () => {
    it('should return event when found', async () => {
      const event = { id: '1', slug: 'test-event' };
      mockRepository.findBySlug.mockResolvedValue(event);

      const result = await service.findBySlug('test-event');
      expect(result).toEqual(event);
    });

    it('should throw NotFoundException when not found', async () => {
      mockRepository.findBySlug.mockResolvedValue(null);

      await expect(service.findBySlug('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const validDto = {
      title: 'Test',
      slug: 'test-event',
      description: 'Desc',
      startDate: '2026-10-15T10:00:00Z',
      endDate: '2026-10-15T18:00:00Z',
    };

    it('should create an event', async () => {
      mockRepository.findBySlug.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue({ id: '1', ...validDto });

      const result = await service.create(validDto);
      expect(result).toHaveProperty('id');
    });

    it('should throw when endDate <= startDate', async () => {
      const invalid = { ...validDto, endDate: '2026-10-15T08:00:00Z' };
      await expect(service.create(invalid)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException when slug exists', async () => {
      mockRepository.findBySlug.mockResolvedValue({ id: 'existing' });

      await expect(service.create(validDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException when event does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.update('nonexistent', { title: 'New' })).rejects.toThrow(NotFoundException);
    });

    it('should update an existing event', async () => {
      const existing = { id: '1', slug: 'test', startDate: new Date('2026-01-01'), endDate: new Date('2026-01-02') };
      mockRepository.findById.mockResolvedValue(existing);
      mockRepository.update.mockResolvedValue({ ...existing, title: 'Updated' });

      const result = await service.update('1', { title: 'Updated', slug: 'test' });
      expect(result.title).toBe('Updated');
    });
  });
});
