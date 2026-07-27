import { IsString, IsOptional, IsBoolean, IsUrl, MinLength, MaxLength } from 'class-validator';

export class CreateCommunityProjectDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  authorName!: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
