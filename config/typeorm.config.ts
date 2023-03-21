import 'dotenv/config';
import * as path from "path";
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { environmentConfigFactory } from './environment.config';
import { User } from '../src/user/user.entity';


const environmentConfig = environmentConfigFactory();

export const typeormConfig: Readonly<PostgresConnectionOptions> = {
    type: 'postgres',

    host: environmentConfig.databaseHost,
    database: environmentConfig.databaseName,
    username: environmentConfig.databaseUsername,
    port: environmentConfig.databasePort,
    password: environmentConfig.databasePassword,

    useUTC: false,
    logNotifications: true,
    applicationName: `${ environmentConfig.hostname }@backend`,
    migrations: [ path.join(__dirname, 'src/migration/*.ts') ],
    entities: [
        User
    ],

    ...(environmentConfig.databaseUseSsl === ('true' || true) && {
        ssl: {
            rejectUnauthorized: false
        }
    }),

    synchronize: environmentConfig.env !== 'production' ? true : false
};
