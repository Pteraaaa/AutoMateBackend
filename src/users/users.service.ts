import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService){}

  async createUser(createUserDto: CreateUserDto) {

    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        phoneNumber: createUserDto.phoneNumber,
      }
    })

    await this.prismaService.credential.create({
      data: {
        password: createUserDto.password,
        userId: user.id
      }
    })

    return user;
  }

  async findUserByEmail(email: string){
    return this.prismaService.user.findUnique({
      where: {
        email: email
      }
    })
  }

  async findUserWithCredentialByEmail(email: string){
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
      include: {
        credential: true
      }
    });
  }

  async findUserProfileById(userId: number){
    return this.prismaService.user.findUnique({
      where: {
        id: userId
      },
      select : {
        id: true,
        name: true,
        email: true,
        phoneNumber: true
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
