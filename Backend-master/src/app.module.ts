import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleware } from './common/authentication.middleware';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { PermitsModule } from './permits/permits.module';
import { PermitUpdatesModule } from './permit-updates/permit-updates.module';
import { WorkLogsModule } from './work-logs/work-logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    PermitsModule,
    PermitUpdatesModule,
    WorkLogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('users')
  }
}
