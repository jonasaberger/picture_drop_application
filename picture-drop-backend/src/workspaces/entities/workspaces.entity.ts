/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum SubscriptionStatusEnum {
  Unpaid = 'Unpaid',
  Canceled = 'Canceled',
  Active = 'Active',
  SessionPending = 'SessionPending'
}

@Entity("Workspaces")
export class Workspaces {

  @PrimaryGeneratedColumn() // Auto-incremented primary key
  @ApiProperty()
  Id : string;

  @Column()
  @ApiProperty()
  Name: string; // Name des entsprechenden Workspace

  @Column()
  @ApiProperty()
  Description : string; // Deskription des Workspaces für evlt. Implementation

  @Column()
  
  CompanyName : string; // Name des entsprechenden Unternehmens

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: SubscriptionStatusEnum
  })
  SubscriptionStatus : SubscriptionStatusEnum; // Enumerator für SubscriptionStatus
}
