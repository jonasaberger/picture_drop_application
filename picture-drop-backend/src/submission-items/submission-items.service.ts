/* eslint-disable*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionItem } from './entities/submission-item.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SubmissionItemsService {
  constructor(
    @InjectRepository(SubmissionItem) private voucherRepository: Repository<SubmissionItem>,
  ) {}

  findAll() {
    return this.voucherRepository.find()
  }

  findOne(Id: string) {
    const submissionItem = this.voucherRepository.findOne({ where: { Id } });
    if (!submissionItem) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return submissionItem;
  }

  remove(Id: string) {
    const submissionItem = this.voucherRepository.findOne({ where: { Id } });
    if (!submissionItem) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.voucherRepository.delete(Id);
  }
}
