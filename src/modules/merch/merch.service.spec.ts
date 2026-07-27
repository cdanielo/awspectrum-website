import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { MerchService } from './merch.service';
import { MerchRepository } from './merch.repository';

describe('MerchService', () => {
  let service: MerchService;
  let repository: MerchRepository;

  const mockRepository = {
    findMany: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MerchService,
        { provide: MerchRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<MerchService>(MerchService);
    repository = module.get<MerchRepository>(MerchRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllActive', () => {
    it('should return active merchandise', async () => {
      const items = [{ id: '1', name: 'T-Shirt', isActive: true }];
      mockRepository.findMany.mockResolvedValue(items);

      const result = await service.findAllActive();
      expect(result).toEqual(items);
      expect(mockRepository.findMany).toHaveBeenCalledWith({ where: { isActive: true } });
    });
  });

  describe('create', () => {
    it('should create a merch item', async () => {
      const dto = { name: 'T-Shirt', price: 25 };
      mockRepository.create.mockResolvedValue({ id: '1', ...dto });

      const result = await service.create(dto);
      expect(result).toHaveProperty('id');
    });
  });

  describe('update', () => {
    it('should throw NotFoundException when item does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.update('nonexistent', { name: 'New' })).rejects.toThrow(NotFoundException);
    });

    it('should update an existing item', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1', name: 'Old' });
      mockRepository.update.mockResolvedValue({ id: '1', name: 'New' });

      const result = await service.update('1', { name: 'New' });
      expect(result.name).toBe('New');
    });
  });
});
