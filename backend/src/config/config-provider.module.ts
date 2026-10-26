import { Module } from '@nestjs/common';
import { configProvider } from '../app.config.provider';

@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class ConfigProviderModule {}
