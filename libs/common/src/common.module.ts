import { Module } from "@nestjs/common";
import { SystemService } from "./services";


@Module({
    providers: [
        SystemService
    ],
    exports: [
        SystemService
    ]
})
export class CommonModule {}
