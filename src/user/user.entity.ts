import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * To avoid bugs, use /user/signup method to create user.
     */
    @Column('varchar', { nullable: true })
    password: string;

    @Column('varchar')
    firstName: string;

    @Column('varchar')
    lastName: string;

    @Column('varchar')
    birthday: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    pphoneNumber: string;

    @Column('varchar', {
        array: true,
        default: []
    })
    links: string[] = [];

    /**
     * Names of bought courses.
     */
    @Column('varchar', {
        array: true,
        default: []
    })
    avalaibleCourses: string[] = [];

    /**
     * Names of finished courses.
     */
    @Column('varchar', {
        array: true,
        default: []
    })
    finishedCourses: string[] = [];
}
