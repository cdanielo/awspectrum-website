import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly saltRounds = 12;

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
    return this.userRepository.create({
      ...data,
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.userRepository.findAll(skip, limit),
      this.userRepository.count(),
    ]);
    return { data, total, page, limit };
  }
}
