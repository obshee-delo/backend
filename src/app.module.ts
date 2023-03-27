import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { typeormConfig } from 'config/typeorm.config';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { PaymentModule } from './payment/payment.module';
import { CourseModule } from './course/course.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@backend/common';
import environmentConfig from 'config/environment.config';


@Module({
    imports: [
        ConfigModule.forRoot({
            load: [ environmentConfig ]
        }),
        TypeOrmModule.forRoot({
            ...typeormConfig,
            autoLoadEntities: true
        }),
        UserModule,
        ClientModule,
        PaymentModule,
        CourseModule,
        CommonModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ]
})
export class AppModule {

}
