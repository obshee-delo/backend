export type ErrorResponse = {
    statusCode: number,
    message: string,
    error: string
}

export type Response<T> = T | ErrorResponse;
