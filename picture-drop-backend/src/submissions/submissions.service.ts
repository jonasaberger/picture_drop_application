import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission) private submissionRepository: Repository<Submission>,
  ) {}

  findAll() {
    return this.submissionRepository.find();
  }

  findOne(id: string) {
    return this.submissionRepository.findOne({where: {Id: id}});
  }

  remove(id: number) {
    return this.submissionRepository.delete(id);
  }
}
