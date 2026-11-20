import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service.js';
import { LocalAuthGuard } from './auth/local-auth.guard.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any){
    return req.user
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req: any){
    await new Promise<void>((resolve, reject) => {
      req.logout((err:any) => (err ? reject(err) : resolve()))
    })
  }
}
