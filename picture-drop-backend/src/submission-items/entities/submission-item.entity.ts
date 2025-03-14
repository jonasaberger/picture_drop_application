/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("SubmissionItems")
export class SubmissionItem {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    Id: string;

    @Column() // ID der entsprechenden Submission
    @ApiProperty()
    SubmissionId: number;

    @Column() // Art des eingereichten Items (z.B. Text, Bild, Video, Audio)
    @ApiProperty()
    ContentType: string;

    @Column() // Zeitstempel für die zeitliche Eingrenzung bei der Statistik
    @ApiProperty()
    CreatedOn: Date;

    @Column()
    @ApiProperty()
    WorkspaceId: number; // TODO: WorkspaceId hinzufügen mittels JOIN-Column über die SubmissionId
}
