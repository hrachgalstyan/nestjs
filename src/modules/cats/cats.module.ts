import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  exports: [CatsService],
  providers: [CatsService],
})
export class CatsModule {}
