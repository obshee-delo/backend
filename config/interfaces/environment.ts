import 'dotenv/config';


export interface Environment {
    NODE_ENV: string,
    HOSTNAME: string,
    DATABASE_NAME: string,
    DATABASE_PORT: string,
    DATABASE_HOST: string,
    DATABASE_USER: string,
    DATABASE_PASSWORD: string,
    PAYMENTS_APPLICATION_ID: string,
    PAYMENTS_APPLICATION_SECRET_KEY: string,
    SMTP_HOST: string,
    SMTP_PORT: string,
    SMTP_USER: string,
    SMTP_PASSWORD: string,
    SMTP_URI: string,
    VERIFICATION_GATEWAY_URL: string,
    EMAIL_VERIFICATION_LIFETIME: number,
    EMAIL_VERIFICATION_COOLDOWN_TIME: number
    JWT_SECRET: string,
    ADMIN_JWT: string,
    DATABASE_URI: string
}
