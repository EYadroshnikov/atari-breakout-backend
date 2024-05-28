import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class ScoreDto {
  @IsString()
  nickname: string;

  @IsNumberString()
  score: number;
}
