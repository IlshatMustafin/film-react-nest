import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from './app.config.provider';
import { ConfigProviderModule } from './config/config-provider.module';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigProviderModule],
      inject: ['CONFIG'],
      useFactory: (config: AppConfig) => ({
        uri: config.database.url,
      }),
    }),
    FilmsModule,
    OrderModule,
  ],
})
export class AppModule {}
