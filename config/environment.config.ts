import 'dotenv/config';


export interface EnvironmentConfig {
    env: string,
    hostname: string,
    databaseHost: string,
    databasePort: number,
    databaseUseSsl: boolean,
    databaseName: string,
    databaseUsername: string,
    databasePassword: string,
    jwtSecret: string
}

export const environmentConfigFactory = (): EnvironmentConfig => ({
    env: process.env.NODE_ENV,
    hostname: process.env.hostname,
    databaseHost: process.env.databaseHost,
    databasePort: parseInt(process.env.databasePort),
    databaseUseSsl: process.env.databaseUseSsl == 'true' ? true : false,
    databaseName: process.env.databaseName,
    databaseUsername: process.env.databaseUsername,
    databasePassword: process.env.databasePassword,
    jwtSecret: process.env.jwtSecret
});
