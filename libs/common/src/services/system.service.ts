import * as os from 'os';
import { Injectable } from "@nestjs/common";


/**
 * Abstraction for handling and formatting data size.
 * Accepts @size as a number of bytes.
 */
class Size {
    constructor(
        private size: number
    ) {}
    
    public get bytes(): number {
        return this.size;
    }

    public get kilobytes(): number {
        return this.bytes / 1024;
    }

    public get megabytes(): number {
        return this.kilobytes / 1024;
    }

    public get gigabytes(): number {
        return this.megabytes / 1024;
    }

    /**
     * Returns the optimal representation of size.
     */
    public get format(): string {
        let { size } = this;
        if (size < 1024) return this.bytes + 'B';
        if (size < 1024 ** 2) return this.kilobytes.toFixed(3) + 'KB';
        if (size < 1024 ** 3) return this.megabytes.toFixed(3) + 'MB';
        return this.gigabytes.toFixed(3) + 'GB';
    }
}

/**
 * Abstraction for handling and formatting time.
 * Accepts @time as a number of seconds.
 */
class Time {
    constructor(
        private time: number
    ) {}
    
    public get seconds(): number {
        return this.time;
    }

    public get minutes(): number {
        return Math.floor(this.time / 60);
    }

    public get hours(): number {
        return Math.floor(this.minutes / 60);
    }

    public get days(): number {
        return Math.floor(this.hours / 24); 
    }

    /**
     * Returns the optimal representation of time.
     */
    public get format(): string {
        const { time } = this;
        if (time < 60) return this.seconds + 's';
        if (time < 60 ** 2) return this.minutes + 'm';
        if (time < 60 ** 2 * 24) return this.hours + 'h';
        return this.days + 'd';
    }
}

/**
 * Wrapper for system information.
 */
@Injectable()
export class SystemService {
    public get totalRam(): Size {
        return new Size(os.totalmem());
    }

    public get freeRam(): Size {
        return new Size(os.freemem());
    }

    public get totalRamUsage(): Size {
        return new Size(this.totalRam.bytes - this.freeRam.bytes);
    }

    public get processRamUsage(): Size {
        return new Size(process.memoryUsage().heapUsed);
    }

    public get uptime(): Time {
        return new Time(Math.floor(process.uptime()));
    }

    public get platform(): string {
        return process.platform;
    }

    public get nodeVersion(): string {
        return process.version;
    }

    /**
     * Not implemented.
     */
    public get cpuUsage(): number {
        return 0;
    }
}