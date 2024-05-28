import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(PlayerEntity)
    private playerRepository: Repository<PlayerEntity>,
  ) {}

  async updateRecord(){

  }
}



// constructor(
//   @InjectRepository(PaymentOrder, 'postgres')
// private paymentOrderRepository: Repository<PaymentOrder>,
// ) {}