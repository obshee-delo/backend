import { Controller, Get } from "@nestjs/common";
import { Response } from "@nestjs/common/decorators/http/route-params.decorator";
import { AppService } from "./app.service";
import { AppHeartbeatResponse } from "./responses";


@Controller()
export class AppController {
    constructor(
        private appService: AppService
    ) {}

    @Get('heartbeat')
    public heartbeat(): Promise<AppHeartbeatResponse> {
        return this.appService.heartbeat();
    }
}
