import { ClientJwtGuard } from "@backend/security/guards/jwt.guard";
import { PermissionsGuard } from "@backend/security/guards/permissions.guard";
import { Permissions, SetPermissions } from "@backend/security/permissions/permissions";
import { Controller, Post, Query, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { PaymentNewDto } from "./dto/new.dto";
import { Payment } from "./payment.entity";
import { PaymentService } from "./payment.service";
import { PaymentNewResponse } from "./responses/new.response";


@Crud({
    model: { type: Payment },
    params: {
        id: {
            field: 'id',
            type: 'string',
            primary: true,
            disabled: false
        }
    }
})
@Controller('payment')
@UseGuards(ClientJwtGuard, PermissionsGuard)
@SetPermissions('payment.crud')
export class PaymentController implements CrudController<Payment> {
    static {
        Permissions.enlistPermissionsGroup('payment', [ 'crud' ])
    }

    constructor(
        public service: PaymentService
    ) {}

    /**
     * Delegate of POST /payment.
     */
    @Post('new')
    public async new(
        @Query() data: PaymentNewDto
    ): Promise<PaymentNewResponse> {
        await this.service.new(data);
        return { ok: true };
    }
}