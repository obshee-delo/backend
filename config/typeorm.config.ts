import 'dotenv/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../src/user/user.entity';
import { Client } from 'src/client/client.entity';
import { Course } from 'src/course/course.entity';
import { Payment } from 'src/payment/payment.entity';
import { EmailVerification } from 'src/auth/verification/email/email.entity';


export const typeormConfig: Readonly<PostgresConnectionOptions> = {
    type: 'postgres',

    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    port: parseInt(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,

    useUTC: false,
    logNotifications: true,
    applicationName: `${ process.env.HOSTNAME }@api`,
    entities: [
        User,
        Client,
        Course,
        Payment,
        EmailVerification
    ],

    ...(process.env.databaseUseSsl === ('true' || true) && {
        ssl: {
            rejectUnauthorized: false
        }
    }),

    synchronize: process.env.NODE_ENV !== 'production' ? true : false
};
