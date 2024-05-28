import { IsOptional, IsString } from 'class-validator';

export class AddMessageDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsOptional()
  nickname?: string;
}
