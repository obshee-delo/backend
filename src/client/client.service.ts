import { JwtToken } from "@backend/security/security.types";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { DeepPartial, Repository } from 'typeorm';
import { Client } from "./client.entity";
import { AuthService } from 'src/auth/auth.service';
import { Refresh } from './interfaces';


@Injectable()
export class ClientService extends TypeOrmCrudService<Client> {
    constructor(
        @InjectRepository(Client) private repository: Repository<Client>,
        private authService: AuthService
    ) {
        super(repository);
    }

    public async authorize(data: DeepPartial<Client>): Promise<JwtToken> {
        return this.authService.sign('client', data);
    }

    /**
     * Creates an application with all rights, if none exists.
     * Returns JWT-token of that application.
     */
    public async openAccess(): Promise<JwtToken> {
        let client = await this.findOne({ where: { permissions: '{*}' } });

        if (client) throw new HttpException(
            'You must clear your database to open access again.',
            HttpStatus.FORBIDDEN
        );

        if (!client) {
            client = Object.assign(
                await this.repository.create(),
                {
                    name: 'admin',
                    description: 'Admin application.',
                    permissions: [ '*' ]
                } as DeepPartial<Client>
            );
            await this.repository.save(client);
        }

        return this.authorize(client as DeepPartial<Client>);
    }

    public async signUp(data: DeepPartial<Client>): Promise<JwtToken> {
        const client = Object.assign(await this.repository.create(), data);
        await this.repository.save(client);

        return this.authorize(data);
    }

    public async refresh({ id }: Refresh): Promise<JwtToken> | never {
        const client = await this.findOne({ where: { id } });
        
        if (!client) throw new HttpException('Client not found.', HttpStatus.NOT_FOUND);

        return this.authorize(client as DeepPartial<Client>);
    }
}