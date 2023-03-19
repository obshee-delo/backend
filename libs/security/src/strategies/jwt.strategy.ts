
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { environmentConfigFactory } from 'config/environment.config';


@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'UserJwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environmentConfigFactory().jwtSecret
        });
    }

    async validate(payload: any): Promise<any> {
        return (payload?.scope === 'user') ? payload : null;
    }
}

@Injectable()
export class ClientJwtStrategy extends PassportStrategy(Strategy, 'ClientJwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environmentConfigFactory().jwtSecret
        });
    }

    async validate(payload: any): Promise<any> {
        return (payload?.scope === 'client') ? payload : null;
    }
}
