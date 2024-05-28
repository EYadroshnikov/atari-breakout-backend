import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreEntity } from './entities/scoreEntity';
import { Repository } from 'typeorm';
import { ScoreDto } from './dtos/score.dto';
import { PageOptionsDto } from './dtos/page-options.dto';
import { PageDto } from './dtos/page.dto';
import { PageMetaDto } from './dtos/page-meta.dto';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(ScoreEntity)
    private scoreRepository: Repository<ScoreEntity>,
  ) {
  }

  async updateRecord(scoreDto: ScoreDto) {
    const { nickname, score } = scoreDto;

    let player = await this.scoreRepository.findOne({ where: { nickname } });

    if (player && score > player.score) {
      player.score = score;
      await this.scoreRepository.save(player);
    }

    if (!player) {
      player = ScoreEntity.toEntity(scoreDto);
      await this.scoreRepository.insert(player);
    }
  }

  async getScores(pageOptionsDto: PageOptionsDto): Promise<PageDto<ScoreDto>> {
    const queryBuilder = this.scoreRepository.createQueryBuilder('score');
    queryBuilder
      .orderBy('score.score', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
