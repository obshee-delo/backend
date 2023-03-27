import * as nodemailer from 'nodemailer';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Environment } from "config/interfaces/environment";
import { Repository } from "typeorm";
import { EmailVerification } from "./email.entity";
import { EmailVerificationCanVerify, EmailVerificationConfirm, EmailVerificationRetry, EmailVerificationVerify } from "./interfaces";
import { randomBytes } from 'crypto';


@Injectable()
export class EmailVerificationService extends TypeOrmCrudService<EmailVerification> {
    constructor(
        @InjectRepository(EmailVerification) public repository: Repository<EmailVerification>,
        private configService: ConfigService<Environment>
    ) {
        super(repository);
    }
    
    private generateCode(): string {
        return randomBytes(32).toString('hex');
    }

    /**
     * Returns true if the cooldown has already passed.
     */
    private isCooldownPassed(instance: EmailVerification): boolean {
        const timeDelay = Date.now() - instance.lastSendTime;
        return timeDelay > this.configService.get<number>('EMAIL_VERIFICATION_COOLDOWN_TIME');
    }

    /**
     * Returns true if the lifetime has already passed.
     */
    private isLifetimePassed(instance: EmailVerification): boolean {
        const timeDelay = Date.now() - instance.lastSendTime;
        return timeDelay > this.configService.get<number>('EMAIL_VERIFICATION_LIFETIME');
    }

    /**
     * Determines whether the action can be verified again.
     */
    public async canVerify(data: EmailVerificationCanVerify): Promise<boolean> {
        let emailVerification = await this.findOne({ where: { id: data.id } });

        if (emailVerification) return false;

        if (!this.isCooldownPassed(emailVerification))
            return false;

        return true;
    }

    public async updateLastSendTime(instance: EmailVerification): Promise<void> {
        instance.lastSendTime = Math.floor(Date.now() / 1000);
        await this.repository.save(instance);
    }

    /**
     * Sets a timer to delete a verification instance.
     */
    public setDeleteTimeout(instance: EmailVerification) {
        setTimeout(async () => {
            if (this.isLifetimePassed(instance)) {
                await this.repository.delete(instance);
            }
        }, this.configService.get<number>('EMAIL_VERIFICATION_LIFETIME'))
    }
    
    public async sendMessage(instance: EmailVerification): Promise<void> {
        const transporter = nodemailer.createTransport(this.configService.get<string>('SMTP_URI'));
        
        const mailOptions = {
            to: instance.email,
            subject: instance.purpose, 
            text: instance.purpose, 
            html: `<a href="${instance.gatewayUrl}?code=${instance.code}">Подтвердить</a>`
        };

        await transporter.sendMail(mailOptions).catch(e => {
            throw new HttpException(e, HttpStatus.BAD_GATEWAY);
        });
    }

    /**
     * Sends message and updates lifetime cycle.
     */
    public async sendMessageAndUpdateLifetime(instance: EmailVerification): Promise<void> {
        this.sendMessage(instance);
        this.updateLastSendTime(instance);
        this.setDeleteTimeout(instance);
    }

    /**
     * Creates an email verification instance and
     * sends verification code to the user's email.
     */
    public async verify(data: EmailVerificationVerify): Promise<void> {
        if (!this.canVerify(data))
            throw new HttpException('query.id.cannotVerify', HttpStatus.BAD_REQUEST);

        const { id, email, action, purpose, gatewayUrl } = data;
 
        const code = this.generateCode();

        const emailVerification = Object.assign(await this.repository.create(), {
            id,
            code,
            email,
            action,
            purpose,
            gatewayUrl
        });

        this.repository.save(emailVerification);

        this.sendMessageAndUpdateLifetime(emailVerification);
    }

    public async retry(data: EmailVerificationRetry): Promise<void> {
        const emailVerification = await this.findOne({
            where: {
                id: data.id,
                action: data.action
            }
        });

        if (!this.isCooldownPassed(emailVerification))
            throw new HttpException('query.tooEarly', HttpStatus.BAD_REQUEST);

        if (!emailVerification)
            throw new HttpException('storage.emailVerification.notFound', HttpStatus.NOT_FOUND);

        this.sendMessageAndUpdateLifetime(emailVerification);
    }

    /**
     * Accepts verification code for confirmation.
     */
    public async confirm(data: EmailVerificationConfirm): Promise<string> {
        const emailVerification = await this.findOne({ where: { code: data.code } });

        if (!emailVerification)
            throw new HttpException('query.emailVerificationCode.invalid', HttpStatus.BAD_REQUEST);

        return emailVerification.id;
    }
}