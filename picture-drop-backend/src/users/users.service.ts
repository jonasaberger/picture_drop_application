/* eslint-disable */
// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(Id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { Id } });
  }

  async remove(Id: string): Promise<void> {
    await this.userRepository.delete(Id);
  }
}