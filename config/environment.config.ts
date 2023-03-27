import { Environment } from "./interfaces/environment";

export default (): Environment => ({
    NODE_ENV: process.env.NODE_ENV,
    HOSTNAME: process.env.HOSTNAME,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    PAYMENTS_APPLICATION_ID: process.env.PAYMENTS_APPLICATION_ID,
    PAYMENTS_APPLICATION_SECRET_KEY: process.env.PAYMENTS_APPLICATION_SECRET_KEY,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_URI: process.env.SMTP_URI,
    VERIFICATION_GATEWAY_URL: process.env.VERIFICATION_GATEWAY_URL,
    EMAIL_VERIFICATION_LIFETIME: parseInt(process.env.EMAIL_VERIFICATION_LIFETIME),
    EMAIL_VERIFICATION_COOLDOWN_TIME: parseInt(process.env.EMAIL_VERIFICATION_COOLDOWN_TIME),
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_JWT: process.env.ADMIN_JWT,
    DATABASE_URI: process.env.DATABASE_URI
});
