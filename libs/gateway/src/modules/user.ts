import { ApiAdapter } from '../adapter';
import { CrudService, CrudUpdateRequest } from '../service';
import { Response } from '../types';


export type User = {
    id: string,
    password: string,
    firstName: string,
    lastName: string,
    birthday: string,
    email: string,
    phoneNumber: string,
    links: string[],
    avalaibleCourses: string[],
    finishedCourses: string[]
}

export type UserSignUpRequest = User;

export type UserAuthorizationResponse = Response<{
    token: string
}>;

export interface UserLoginRequest {
    email: string,
    password: string
}


export class UserService extends CrudService<User> {
    constructor(adapter: ApiAdapter) {
        super(adapter, 'user');
    }

    public signUp(parameters: UserSignUpRequest): Promise<UserAuthorizationResponse> {
        return this.adapter.post<UserAuthorizationResponse>('user/signUp', parameters);
    }

    public login(parameters: UserLoginRequest): Promise<UserAuthorizationResponse> {
        return this.adapter.post<UserAuthorizationResponse>('user/login', parameters);
    }
}
