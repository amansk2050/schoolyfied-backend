import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailService } from "./mail.service";
import { join } from "path";

/**
 * It is a feature module where we keep the service and code related to mails. we import the nestjs mailer module and configure it to work with templates using pugAdapter.
 */
@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                if (process.env.STAGE === "dev") {
                    return {
                        transport: {
                            host: configService.get("EMAIL_HOST"),
                            port: configService.get("EMAIL_PORT"),
                            auth: {
                                user: configService.get("EMAIL_USERNAME"),
                                pass: configService.get("EMAIL_PASSWORD"),
                            },
                        },
                        defaults: {
                            from: "'no-reply' <info@your-org.io>",
                        },
                        template: {
                            dir: join(__dirname, "templates"),
                            adapter: new PugAdapter(), // NOTE: change to your preferable adapter
                            options: {
                                strict: true,
                            },
                        },
                    };
                }
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
