import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentController } from "./payment.controller";
import { Payment } from "./payment.entity";
import { PaymentService } from "./payment.service";


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([ Payment ])
    ],
    controllers: [
        PaymentController
    ],
    providers: [
        PaymentService
    ],
    exports: [
        PaymentService
    ]
})
export class PaymentModule {}
