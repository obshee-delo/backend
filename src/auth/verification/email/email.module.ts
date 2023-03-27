import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getMailConfig } from "config/mail.config";
import { EmailVerification } from "./email.entity";
import { EmailVerificationService } from "./email.service";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([ EmailVerification ]),
        MailerModule.forRootAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: getMailConfig
        })
    ],
    providers: [
        EmailVerificationService
    ],
    exports: [
        EmailVerificationService
    ]
})
export class EmailVerificationModule {}
