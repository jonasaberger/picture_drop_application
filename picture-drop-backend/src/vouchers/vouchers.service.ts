/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vouchers } from './entities/voucher.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(Vouchers) private voucherRepository: Repository<Vouchers>,
  ) {}

  async findAll() : Promise<Vouchers[]> {
    return await this.voucherRepository.find();
  }

  async findOne(Id: string): Promise<Vouchers> {
    const voucher = await this.voucherRepository.findOne({ where: { Id } });
    if (!voucher) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return voucher;
  }

  async remove(Id: string) {
    const voucher = await this.voucherRepository.findOne({ where: { Id } });
    if (!voucher) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return await this.voucherRepository.delete(Id);
  }
}
