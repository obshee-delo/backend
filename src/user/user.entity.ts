import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    /**
     * To avoid bugs, use /user/signup method to create user.
     */
    @Column('varchar', { nullable: true })
    public password: string;

    @Column('varchar')
    public firstName: string;

    @Column('varchar')
    public lastName: string;

    @Column('varchar')
    public birthday: string;

    @Column('varchar')
    public email: string;

    @Column('varchar')
    public phoneNumber: string;

    @Column('varchar', { array: true, nullable: true })
    public links: string[] = [];

    /**
     * Names of bought courses.
     */
    @Column('varchar', { array: true, nullable: true })
    public avalaibleCourses: string[] = [];

    /**
     * Names of finished courses.
     */
    @Column('varchar', { array: true, nullable: true })
    public finishedCourses: string[] = [];
}
