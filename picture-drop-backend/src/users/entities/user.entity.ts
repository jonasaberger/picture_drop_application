/* eslint-disable */
// src/users/entity/users.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity("Users") // Declares the class as an entity
export class User {
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  @ApiProperty()
  Id: string;

  @Column() // Specifies a regular column
  @ApiProperty()
  Username: string;

  @Column() // Specifies a regular column
  @ApiProperty()
  FirstName: string;

  @Column() // Specifies a regular column
  @ApiProperty()
  LastName: string;

  @Column() // Specifies a regular column
  @ApiProperty()
  Email: string;

  @Column()
  @ApiProperty()
  StripeCustomerId : string;
}
