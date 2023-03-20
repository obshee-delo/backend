import { ApiAdapter } from './adapter';
import { Response } from './types';


export type CrudModel<T> = { id: string } & T;

export interface CrudGetRequest {
    id: string,
    fields?: string[]
}

export interface CrudGetAllRequest {
    fields?: string[]
}

export type CrudCreateRequest<T> = CrudModel<Required<T>>;

export type CrudUpdateRequest<T> = CrudModel<Partial<T>>;

export interface CrudDeleteRequest {
    id: string
};

export type CrudGetResponse<T> = Response<CrudModel<T>>;

export type CrudGetAllResponse<T> = Response<CrudModel<T>[]>;

export type CrudCreateResponse<T> = Response<CrudModel<T>>;

export type CrudUpdateResponse<T> = Response<CrudModel<T>>;

export type CrudDeleteResponse = Response<{}>;


abstract class Service {
    protected adapter: ApiAdapter;

    constructor(adapter: ApiAdapter) {
        this.adapter = adapter;
    }
}

export abstract class CrudService<T> extends Service {
    private name: string;

    constructor(adapter: ApiAdapter, name: string) {
        super(adapter);
        
        this.name = name;
    }

    public async get(parameters: CrudGetRequest): Promise<CrudGetResponse<T>> {
        let fields = parameters?.fields?.join(',');

        return this.adapter.get<CrudGetResponse<T>>(
            `${this.name}/${parameters.id}`, fields && { fields }
        );
    }

    public async getAll(parameters?: CrudGetAllRequest): Promise<CrudGetAllResponse<T>> {
        let fields = parameters?.fields?.join(',');

        return this.adapter.get<CrudGetAllResponse<T>>(
            this.name, fields && { fields }
        );
    }

    public async create(parameters: CrudCreateRequest<T>): Promise<CrudCreateResponse<T>> {
        return this.adapter.post<CrudCreateResponse<T>>(
            this.name, {}, parameters
        );
    }

    public async update({ id, ...parameters }: CrudUpdateRequest<T>): Promise<CrudUpdateResponse<T>> {
        return this.adapter.patch<CrudUpdateResponse<T>>(
            `${this.name}/${id}`, {}, parameters
        );
    }

    public async delete(parameters: CrudDeleteRequest): Promise<CrudDeleteResponse> {
        return this.adapter.delete<CrudDeleteResponse>(`${this.name}/${parameters.id}`);
    }
}