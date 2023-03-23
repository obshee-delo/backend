import { TypeOrmExceptionFilter } from '@backend/common';
import { LogLevel, ValidationPipe } from '@nestjs/common';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';


/**
 * Nest application factory for any public application(gateway).
 * 
 * Idea source:
 * https://github.com/boticord/backend/blob/main/libs/boticord-factory/src/boticord-factory.ts
 */
export class GatewayFactory {
    static async create(
        rootModule: any,
        adapter: AbstractHttpAdapter = new FastifyAdapter({
            ignoreTrailingSlash: true
        })
    ) {
        const app = await NestFactory.create<NestFastifyApplication>(
            rootModule,
            adapter,
            {
                logger: 'log,error,warn,debug,verbose'.split(',') as LogLevel[]
            },
        );

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true
        }));
        app.useGlobalFilters(new TypeOrmExceptionFilter());
        app.enableCors({ origin: '*' });
        app.enableShutdownHooks();

        return app;
    }
}
