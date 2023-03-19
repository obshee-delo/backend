import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar', { length: 256 })
    public name: string;

    @Column('varchar')
    public description: string;

    @Column('varchar', { array: true })
    public permissions: string[];
}
