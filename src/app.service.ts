import { SystemService } from '@backend/common';
import { Injectable } from '@nestjs/common';
import { AppHeartbeatResponse } from './responses/index';


@Injectable()
export class AppService {
    constructor(
        private systemService: SystemService
    ) {}

    public async heartbeat(): Promise<AppHeartbeatResponse> {
        return {
            alive: true,
            uptime: this.systemService.uptime.format,
            system: {
                platform: this.systemService.platform,
                ram: {
                    total: this.systemService.totalRam.format,
                    free: this.systemService.freeRam.format,
                    usage: {
                        total: this.systemService.totalRamUsage.format,
                        process: this.systemService.processRamUsage.format
                    }
                },
                runtime: {
                    node: {
                        version: this.systemService.nodeVersion
                    }
                }
            }
        }
    }
}