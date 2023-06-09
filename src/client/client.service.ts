import { Jwt } from "@backend/security/security.types";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { DeepPartial, Repository } from 'typeorm';
import { Client } from "./client.entity";
import { AuthService } from 'src/auth/auth.service';
import { Refresh, SignUp } from './interfaces';


@Injectable()
export class ClientService extends TypeOrmCrudService<Client> {
    constructor(
        @InjectRepository(Client) private repository: Repository<Client>,
        private authService: AuthService
    ) {
        super(repository);
    }

    public async authorize(data: Client): Promise<Jwt> {
        return this.authService.sign('client', data);
    }

    public async signUp(data: SignUp): Promise<Jwt> {
        const client = Object.assign(await this.repository.create(), data);
        await this.repository.save(client);

        return this.authorize(client);
    }

    public async refresh({ id }: Refresh): Promise<Jwt> | never {
        const client = await this.findOne({ where: { id } });
        
        if (!client) throw new HttpException('Client not found.', HttpStatus.NOT_FOUND);

        return this.authorize(client);
    }
}
