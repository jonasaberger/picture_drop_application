/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Vouchers")
export class Vouchers {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    Id : string;

    @Column()
    @ApiProperty()
    WorkspaceId : string; // Den zugehörigen Workspace

    @Column()
    @ApiProperty()
    ValidatedOn : Date; // Datum der Validierung -> ob der Voucher eingelöst wurde
}
