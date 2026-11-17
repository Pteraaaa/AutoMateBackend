import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { WorkshopsModule } from './workshops/workshops.module.js';

@Module({
  imports: [UsersModule, WorkshopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
