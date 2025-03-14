/* eslint-disable */
//src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Workspaces } from 'src/workspaces/entities/workspaces.entity';
import { Vouchers } from '../vouchers/entities/voucher.entity';
import { SubmissionItem } from 'src/submission-items/entities/submission-item.entity';
import { Submission } from 'src/submissions/entities/submission.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, Workspaces, Vouchers, SubmissionItem, Submission],
        synchronize: false, // Be cautious about using synchronize in production
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}