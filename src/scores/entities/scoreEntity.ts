import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ScoreDto } from '../dtos/score.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity('high-scores')
@Unique(['nickname'])
export class ScoreEntity extends AbstractEntity{
  @Column({ name: 'nickname', type: 'varchar', length: 255 })
  nickname: string;

  @Column({ name: 'score', type: 'integer' })
  score: number;

  static toEntity(scoreDto: ScoreDto): ScoreEntity {
    const data = classToPlain(scoreDto);
    return plainToClass(ScoreEntity, data);
  }
}
