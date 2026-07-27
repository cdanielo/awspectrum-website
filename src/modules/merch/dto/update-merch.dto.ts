import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchDto } from './create-merch.dto';

export class UpdateMerchDto extends PartialType(CreateMerchDto) {}
