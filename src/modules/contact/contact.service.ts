import { Injectable } from '@nestjs/common';
import type { CreateContactDto } from './dto/create-contact.dto';
import { ContactRepository } from './contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async submit(data: CreateContactDto) {
    return this.contactRepository.create(data);
  }

  async findAll() {
    return this.contactRepository.findAll();
  }
}
