/* eslint-disable*/
import { Module } from '@nestjs/common';
import { SubmissionItemsService } from './submission-items.service';
import { SubmissionItemsController } from './submission-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionItem } from './entities/submission-item.entity';

@Module({
  imports : [TypeOrmModule.forFeature([SubmissionItem])],
  controllers: [SubmissionItemsController],
  providers: [SubmissionItemsService],
})
export class SubmissionItemsModule {}
