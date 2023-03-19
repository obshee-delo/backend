import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'course' })
export class Course {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('varchar')
    public name: string;

    @Column('varchar')
    public category: string;  
}
