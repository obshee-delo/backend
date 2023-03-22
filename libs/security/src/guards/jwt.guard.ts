import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class AdminJwtGuard extends AuthGuard('AdminJwt') {}

@Injectable()
export class ClientJwtGuard extends AuthGuard('ClientJwt') {}
