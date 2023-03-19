import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class UserJwtGuard extends AuthGuard('UserJwt') {}

@Injectable()
export class ClientJwtGuard extends AuthGuard('ClientJwt') {}
