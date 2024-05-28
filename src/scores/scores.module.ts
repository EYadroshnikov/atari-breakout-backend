import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreEntity } from './entities/scoreEntity';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreEntity])],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
