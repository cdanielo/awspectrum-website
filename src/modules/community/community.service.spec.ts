import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityRepository } from './community.repository';

describe('CommunityService', () => {
  let service: CommunityService;
  let repository: CommunityRepository;

  const mockRepository = {
    findMany: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        { provide: CommunityRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    repository = module.get<CommunityRepository>(CommunityRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return projects sorted by isFeatured desc, createdAt desc', async () => {
      const projects = [{ id: '1', title: 'Project A', isFeatured: true }];
      mockRepository.findMany.mockResolvedValue(projects);

      const result = await service.findAll();
      expect(result).toEqual(projects);
      expect(mockRepository.findMany).toHaveBeenCalledWith({
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      });
    });
  });

  describe('create', () => {
    it('should create a project', async () => {
      const dto = { title: 'Project', description: 'Desc', authorName: 'Author' };
      mockRepository.create.mockResolvedValue({ id: '1', ...dto });

      const result = await service.create(dto);
      expect(result).toHaveProperty('id');
    });
  });

  describe('update', () => {
    it('should throw NotFoundException when project does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.update('nonexistent', { title: 'New' })).rejects.toThrow(NotFoundException);
    });

    it('should update an existing project', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1', title: 'Old' });
      mockRepository.update.mockResolvedValue({ id: '1', title: 'New' });

      const result = await service.update('1', { title: 'New' });
      expect(result.title).toBe('New');
    });
  });
});
