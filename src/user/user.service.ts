import * as bcrypt from 'bcrypt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "./user.entity";
import { DeepPartial, Repository } from 'typeorm';
import { JwtToken } from '@backend/security/security.types';
import { AuthService } from 'src/auth/auth.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { UserAuthorization, UserLogin } from './interfaces';


@Injectable()
export class UserService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User) public repository: Repository<User>,
        private authService: AuthService
    ) {
        super(repository);
    }

    public async authorize({ id }: UserAuthorization): Promise<JwtToken> {
        return this.authService.sign('user', { id });
    }

    public async signUp(data: DeepPartial<User>): Promise<JwtToken> {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(data.password, salt);

        const user = Object.assign(await this.repository.create(), { ...data, password });
        await this.repository.save(user);

        return this.authorize(user as UserAuthorization);
    }

    public async login({ email, password }: UserLogin): Promise<JwtToken> | never {
        const user = await this.findOne({ where: { email } });
        
        if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        if (!bcrypt.compare(user.password, password))
            throw new HttpException('Invalid password.', HttpStatus.UNAUTHORIZED);

        return this.authorize(user as UserAuthorization);
    }
}
