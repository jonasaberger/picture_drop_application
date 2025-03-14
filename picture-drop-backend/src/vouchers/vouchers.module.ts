/* eslint-disable */
import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vouchers } from './entities/voucher.entity';
import { VouchersController } from './vouchers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vouchers])],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
