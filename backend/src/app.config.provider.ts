import { ConfigService } from '@nestjs/config';

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

export interface AppConfig {
  port: number;
  database: AppConfigDatabase;
}

export const configProvider = {
  provide: 'CONFIG',
  inject: [ConfigService],
  useFactory: (config: ConfigService): AppConfig => ({
    port: parseInt(config.get<string>('PORT', '3000'), 10),
    database: {
      driver: config.get<string>('DATABASE_DRIVER', 'mongodb'),
      url: config.getOrThrow<string>('DATABASE_URL'),
    },
  }),
};
