import { Environment } from '../../../../config/interfaces/environment';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'AdminJwt') {
    constructor(
        private configService: ConfigService<Environment>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: any): Promise<any> {
        return (payload?.scope === 'admin') ? payload : null;
    }
}

@Injectable()
export class ClientJwtStrategy extends PassportStrategy(Strategy, 'ClientJwt') {
    constructor(
        private configService: ConfigService<Environment>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: any): Promise<any> {
        return (payload?.scope === 'client') ? payload : null;
    }
}
