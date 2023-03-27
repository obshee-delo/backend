import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';
import { Environment } from './interfaces/environment';


export const getMailConfig = async (
    configService: ConfigService<Environment>,
): Promise<any> => {
    const transport = configService.get<string>('SMTP_URI');
    const mailFromAddress = transport.split(':')[1].split('//')[1];

    return {
        transport,
        defaults: {
            from: `"Общее дело" <${mailFromAddress}>`
        },
        template: {
            adapter: new EjsAdapter(),
            options: {
                strict: false,
            }
        }
    };
};
