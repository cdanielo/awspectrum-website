import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityProjectDto } from './create-community-project.dto';

export class UpdateCommunityProjectDto extends PartialType(CreateCommunityProjectDto) {}
