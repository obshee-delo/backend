export type AppHeartbeatResponse = {
    alive: true,
    uptime: string,
    system: {
        platform: string,
        ram: {
            total: string,
            free: string,
            usage: {
                total: string,
                process: string
            }
        },
        runtime: {
            node: {
                version: string
            }
        }
    }
}
