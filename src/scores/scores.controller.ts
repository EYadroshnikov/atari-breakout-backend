import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoreDto } from './dtos/score.dto';
import { PageOptionsDto } from './dtos/page-options.dto';
import { PageDto } from './dtos/page.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {
  }

  @Post()
  async saveResult(@Body() scoreDto: ScoreDto) {
    console.log(scoreDto);
    return this.scoresService.updateRecord(scoreDto);
  }

  @Get()
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ScoreDto>> {
    return this.scoresService.getScores(pageOptionsDto);
  }
}
