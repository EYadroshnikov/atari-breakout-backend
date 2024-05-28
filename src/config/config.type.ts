import { AppConfig } from './app/app-config.type';
import { PostgresConfig } from './postres/postgres-config.type';

export type AllConfigType = {
  app: AppConfig;
  postgres: PostgresConfig;
};
