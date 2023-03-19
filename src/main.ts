import { AppModule } from './app.module';
import { GatewayFactory } from '@backend/common';


async function bootstrap() {
    const app = await GatewayFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap();
