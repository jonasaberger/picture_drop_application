import { Entity, PrimaryColumn, Column } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity("Submissions")
export class Submission {

    @PrimaryColumn()
    @ApiProperty()
    Id : string;

    @Column()
    @ApiProperty()
    WorkspaceId : number;
}

