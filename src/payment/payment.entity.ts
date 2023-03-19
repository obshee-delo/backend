import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    /**
     * Customer's user UUID.
     */
    @Column('varchar')
    public customerId: string;

    @Column('varchar')
    public courseId: string;

    @Column('varchar')
    public receiptUrl: string;

    @Column('varchar')
    public orderId: string;
}
