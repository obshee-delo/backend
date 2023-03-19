import 'dotenv/config';


export interface EnvironmentConfig {
    env: string,
    gatewayPort: number,
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
    env: process.env.env,
    gatewayPort: parseInt(process.env.gatewayPort),
    hostname: process.env.hostname,
    databaseHost: process.env.databaseHost,
    databasePort: parseInt(process.env.databasePort),
    databaseUseSsl: process.env.databaseUseSsl == 'true' ? true : false,
    databaseName: process.env.databaseName,
    databaseUsername: process.env.databaseUsername,
    databasePassword: process.env.databasePassword,
    jwtSecret: process.env.jwtSecret
});
