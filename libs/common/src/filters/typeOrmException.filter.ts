import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';


@Catch(QueryFailedError, EntityNotFoundError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError | EntityNotFoundError, host: ArgumentsHost): void {
        throw new HttpException(exception.message, HttpStatus.BAD_REQUEST);
    }
}
