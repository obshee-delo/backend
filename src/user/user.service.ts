import * as bcrypt from 'bcrypt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "./user.entity";
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserAuthorization, UserConfirmPasswordReset, UserConfirmRegistration, UserHashPassword, UserLogin, UserResetPassword, UserSetPassword, UserVerifyEmail, UserVerifyPassword } from './interfaces';
import { EmailVerificationService } from 'src/auth/verification/email/email.service';


@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) public repository: Repository<User>,
        private authService: AuthService,
        private emailVerificationService: EmailVerificationService
    ) {
        super(repository);
    }

    public hashPassword(data: UserHashPassword): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(data.password, salt);
    }

    public verifyPassword(data: UserVerifyPassword): boolean {
        if (data.password.length < 8)
            throw new HttpException('query.password.short', HttpStatus.BAD_REQUEST);

        return true;
    }

    public authorize(data: UserAuthorization): string {
        return this.authService.sign('user', { id: data.id });
    }

    public async verifyEmail({ email }: UserVerifyEmail): Promise<boolean> {
        const user = await this.findOne({ where: { email } });
        return !!user;
    }

    public async register(data: User): Promise<User> {
        if (!(await this.verifyEmail({ email: data.email })))
            throw new HttpException('query.email.busy', HttpStatus.BAD_REQUEST);

        if (data.password.length < 8)
            throw new HttpException('query.password.short', HttpStatus.BAD_REQUEST);

        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(data.password, salt);

        const user = Object.assign(await this.repository.create(), { ...data, password });
        await this.repository.save(user);

        return user;
    }

    public async login({ email, password }: UserLogin): Promise<string> {
        const user = await this.findOne({ where: { email } });
        
        if (!user) throw new HttpException('query.email.busy', HttpStatus.BAD_REQUEST);
        if (!bcrypt.compare(user.password, password))
            throw new HttpException('query.password.mismatch', HttpStatus.BAD_REQUEST);

        return this.authorize(user);
    }

    public async confirmRegistration(data: UserConfirmRegistration): Promise<string> {
        const userId = await this.emailVerificationService.confirm({
            code: data.emailVerificationCode
        });

        const user = await this.findOne({ where: { id: userId } });

        if (!user) throw new HttpException('storage.user.notFound', HttpStatus.NOT_FOUND);

        user.verified = true;
        await this.repository.save(user);

        return this.authorize(user);
    }

    public async resetPassword(data: UserResetPassword): Promise<User> {
        const user = await this.findOne({ where: { email: data.email } });
        
        if (!user) throw new HttpException('query.email.notFound', HttpStatus.NOT_FOUND);

        if (!user.password)
            throw new HttpException('storage.user.password.empty', HttpStatus.BAD_REQUEST);

        user.password = '';
        await this.repository.save(user);

        return user;
    }

    public async confirmPasswordReset(data: UserConfirmPasswordReset): Promise<string> {
        const userId = await this.emailVerificationService.confirm({
            code: data.emailVerificationCode
        });

        const user = await this.findOne({ where: { id: userId } });

        if (!user) throw new HttpException('storage.user.notFound', HttpStatus.NOT_FOUND);

        return this.authorize(user);
    }

    public async setPassword(data: UserSetPassword): Promise<void> {
        const user = await this.findOne({ where: { id: data.id } });

        if (!user) throw new HttpException('query.userId.notFound', HttpStatus.NOT_FOUND);

        if (!this.verifyPassword(data)) return;

        user.password = data.password;
        await this.repository.save(user);
    }
}
