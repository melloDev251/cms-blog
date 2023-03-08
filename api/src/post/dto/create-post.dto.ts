import { Category } from './../../category/entities/category.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  categoryId: number;

  @ApiProperty()
  @IsString()
  mainImageUrl: string;

  @ApiProperty()
  @IsOptional()
  category: Category;
}
