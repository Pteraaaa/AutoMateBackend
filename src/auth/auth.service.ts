import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto.js';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService){}

  async validateUser(email: string, pass: string){
    const user = await this.usersService.findUserWithCredentialByEmail(email)

    if(!user || !user.credential){
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, user.credential.password);

    if(!isPasswordValid){
      return null;
    }

    const { credential, ...userData } = user;

    return userData;
  }

  async login(user: any){
    const payload = { sub: user.id, email: user.email,}
    return{
      access_token: this.jwtService.sign(payload)
    }
  }
  
  async register(createUserDto: CreateUserDto){
    const existingUser = await this.usersService.findUserByEmail(createUserDto.email);

    if(existingUser){
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10
    )

    return this.usersService.createUser({...createUserDto, password: hashedPassword})
  }
}
