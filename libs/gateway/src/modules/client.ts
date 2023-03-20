import { ApiAdapter } from '../adapter';
import { CrudService, CrudUpdateRequest } from '../service';
import { Response } from '../types';


export type Client = {
    id: string,
    name: string,
    description: string,
    permissions: string[]
}

export type ClientSignUpRequest = Client;

export type ClientRefreshRequest = { id: string };

export type ClientAuthorizationResponse = Response<{
    token: string,
    secret: string
}>;


export class ClientService extends CrudService<Client> {
    constructor(adapter: ApiAdapter) {
        super(adapter, 'client');
    }

    public openAccess(): Promise<ClientAuthorizationResponse> {
        return this.adapter.post<ClientAuthorizationResponse>('client/openAccess');
    }

    public signUp(parameters: ClientSignUpRequest): Promise<ClientAuthorizationResponse> {
        return this.adapter.post<ClientAuthorizationResponse>('client/signup', parameters);
    }

    public refresh(parameters: ClientRefreshRequest): Promise<ClientAuthorizationResponse> {
        return this.adapter.post<ClientAuthorizationResponse>(`client/refresh/${parameters.id}`);
    }
}
