import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import postgresConfig from './config/postres/postgres.config';
import appConfig from './config/app/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [appConfig, postgresConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('postgres.host'),
        port: configService.get('postgres.port'),
        username: configService.get('postgres.username'),
        password: configService.get('postgres.password'),
        database: configService.get('postgres.database'),
        autoLoadEntities: true,
        synchronize: true,
        connectTimeoutMS: 15000,
      }),
      inject: [ConfigService],
    }),
    ScoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
