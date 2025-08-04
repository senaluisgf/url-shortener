import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ShortenerModule } from './shortener/shortener.module';

@Module({ imports: [ConfigModule.forRoot(), ShortenerModule, AuthModule] })
export class AppModule {}
