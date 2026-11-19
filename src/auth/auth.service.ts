import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}


  async validateUser(username: string, pass: string){
    const user = await this.usersService.findOne(username);
    if(user && user.password === pass){
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
  create() {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
