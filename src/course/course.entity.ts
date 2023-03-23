import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'course' })
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    category: string;  
}
