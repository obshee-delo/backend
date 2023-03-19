import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm/repository/Repository";
import { PaymentNew } from "./interfaces";
import { Payment } from "./payment.entity";


@Injectable()
export class PaymentService extends TypeOrmCrudService<Payment> {
    constructor(
        @InjectRepository(Payment) private repository: Repository<Payment>
    ) {
        super(repository);
    }

    /**
     * Processes and saves the payment receipt.
     */
    public async new(data: PaymentNew) {
        
    }
}