import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 256 })
    name: string;

    @Column('varchar')
    description: string;

    @Column('varchar', { array: true })
    permissions: string[];
}
