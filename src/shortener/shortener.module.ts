import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';

@Module({
  controllers: [ShortenerController],
  providers: [ShortenerService, PrismaService],
})
export class ShortenerModule {}
