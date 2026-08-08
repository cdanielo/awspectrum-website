import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    count: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user with hashed password', async () => {
      const dto = { email: 'test@test.com', password: '12345678', firstName: 'Test', lastName: 'User' };
      mockRepository.create.mockResolvedValue({ id: '1', ...dto, password: 'hashed', createdAt: new Date(), updatedAt: new Date() });

      const result = await service.createUser(dto);

      expect(mockRepository.create).toHaveBeenCalled();
      const calledData = mockRepository.create.mock.calls[0][0];
      expect(calledData.password).not.toBe(dto.password);
      expect(calledData.password).toContain('$2');
    });
  });

  describe('findAll', () => {
    it('should return paginated users without passwords', async () => {
      const users = [{ id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B', createdAt: new Date() }];
      mockRepository.findAll.mockResolvedValue(users);
      mockRepository.count.mockResolvedValue(1);

      const result = await service.findAll();

      expect(result.data).toEqual(users);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(mockRepository.findAll).toHaveBeenCalledWith(0, 10);
    });
  });
});
