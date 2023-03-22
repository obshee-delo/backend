import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { typeormConfig } from 'config/typeorm.config';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { PaymentModule } from './payment/payment.module';
import { CourseModule } from './course/course.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            ...typeormConfig,
            autoLoadEntities: true
        }),
        UserModule,
        ClientModule,
        PaymentModule,
        CourseModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
