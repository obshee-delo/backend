import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';


export interface ConnectionParameters {
    node: {
        host: string,
        port: number
    }
}

export interface ClientCredentials {
    token: string
}

export interface RequestParameters {
    method: string,
    path: string,
    data?: any,
    params?: any
}


export class ApiAdapter {
    private connectionParameters: ConnectionParameters;
    private clientCredentials: ClientCredentials;
    private httpAdapter: Axios = new Axios({});


    constructor(
        connectionParameters: ConnectionParameters,
        clientCredentials: ClientCredentials
    ) {
        this.connectionParameters = connectionParameters;
        this.clientCredentials = clientCredentials;
    }

    private url(path=''): string {
        let { node: { host, port } } = this.connectionParameters;

        return `${host}:${port}/${path}`;
    }

    private get token(): string {
        return this.clientCredentials.token;
    }

    private requestConfig(payload={}): AxiosRequestConfig {
        return Object.assign({
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        }, payload);
    }

    private requestArguments<IncludesData extends boolean>(
        path: string, params={}, data={}
    ): IncludesData extends true
        ? [ string, string, AxiosRequestConfig ]
        : [ string, AxiosRequestConfig ]
     {
        let args = [ this.url(path) ];

        if (data) args.push(JSON.stringify(data));

        return [ ...args, this.requestConfig(params) ] as any;
    }

    public async get<T>(path: string, params={}): Promise<T> {
        let response = await this.httpAdapter.get(...this.requestArguments<false>(path, params));
        return JSON.parse(response.data) as Promise<T>;
    }

    public async post<T>(path: string, params={}, data={}): Promise<T> {
        let response = await this.httpAdapter.post(...this.requestArguments<true>(path, params, data));
        return JSON.parse(response.data) as Promise<T>;
    }

    public async patch<T>(path: string, params={}, data={}): Promise<T> {
        let response = await this.httpAdapter.patch(...this.requestArguments<true>(path, params, data));
        return JSON.parse(response.data) as Promise<T>;
    }

    public async delete<T>(path: string, params={}): Promise<T> {
        let response = await this.httpAdapter.get(...this.requestArguments<false>(path, params));
        return JSON.parse(response.data) as Promise<T>;
    }
}
