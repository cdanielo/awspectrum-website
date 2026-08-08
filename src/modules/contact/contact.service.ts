import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactRepository } from './contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async submit(data: CreateContactDto) {
    return this.contactRepository.create({
      ...data,
      email: data.email.trim().toLowerCase(),
      name: data.name.trim(),
      interest: data.interest?.trim(),
      message: data.message?.trim(),
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.contactRepository.findAll(skip, limit),
      this.contactRepository.count(),
    ]);
    return { data, total, page, limit };
  }
}
