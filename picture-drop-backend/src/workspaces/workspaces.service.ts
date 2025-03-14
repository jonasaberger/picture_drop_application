/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Workspaces } from './entities/workspaces.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces) private workspaceRepository: Repository<Workspaces>,
  ) {}

  async findAll() : Promise<Workspaces[]>{
    return await this.workspaceRepository.find();
  }

  async findOne(Id: string) {
    return await this.workspaceRepository.findOne({ where: { Id } });
  }

  async remove(Id: number) {
    return await this.workspaceRepository.delete(Id);
  }
}
