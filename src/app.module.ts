import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { WorkshopsModule } from './workshops/workshops.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [UsersModule, WorkshopsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
