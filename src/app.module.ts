import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./core/logger.middleware";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { MailModule } from "./mail/mail.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "./user/user.module";

/**
 * It is the root module for the application in we import all feature modules and configure modules and packages that are common in feature modules. Here we also configure the middlewares.
 *
 * Here, feature modules imported are - DatabaseModule, AuthModule, MailModule and UserModule.
 * other modules are :
 *      ConfigModule - enables us to access environment variables application wide.
 *      TypeOrmModule - it is an ORM and enables easy access to database.
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.stage.${process.env.STAGE}`],
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ttl: config.get("THROTTLE_TTL"),
                limit: config.get("THROTTLE_LIMIT"),
            }),
        }),
        DatabaseModule,
        AuthModule,
        MailModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("/**");
    }
}
