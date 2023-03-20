import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Receipt } from "./interfaces";


@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    /**
     * Customer's user UUID.
     */
    @Column('varchar')
    public userId: string;

    @Column('varchar')
    public courseName: string;

    @Column('jsonb')
    public receipt: Receipt;
}
