import { Controller, Get } from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {
  }

  @Get('save-result')
  async saveResult(){

  }
}

