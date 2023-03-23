import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Receipt } from "./interfaces";


@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Customer's user UUID.
     */
    @Column('varchar')
    userId: string;

    @Column('varchar')
    courseName: string;

    @Column('jsonb')
    receipt: Receipt;
}
