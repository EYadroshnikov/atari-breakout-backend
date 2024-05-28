import { IsNumber, IsString } from 'class-validator';

export class ScoreDto {
  @IsString()
  nickname: string;

  @IsNumber()
  score: number;
}
