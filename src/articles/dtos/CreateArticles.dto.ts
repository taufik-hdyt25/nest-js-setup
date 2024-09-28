import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticlesDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}
