import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import type { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly saltRounds = 12;

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
    return this.userRepository.create({ ...data, password: hashedPassword });
  }

  async findAll() {
    return this.userRepository.findAll();
  }
}
