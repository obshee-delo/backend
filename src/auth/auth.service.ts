import { JwtService } from '@nestjs/jwt';
import { Injectable } from "@nestjs/common";
import { DeepPartial } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}

    public sign<Entity>(scope: string, entity: Entity) {
        return this.jwtService.sign({ scope, ...entity as DeepPartial<Entity> });
    }
}
