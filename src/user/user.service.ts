import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaServices } from 'src/prisma/prisma.service';

@Injectable()
export class UserServices {
  constructor(private prisma: PrismaServices) {}

  createUser(createUserData: Prisma.usersCreateInput) {
    return this.prisma.users.create({ data: createUserData });
  }

  getUsers() {
    return this.prisma.users.findMany();
  }
  getUserByUsername(username: string) {
    return this.prisma.users.findUnique({
      where: {
        username: username,
      },
    });
  }
  deleteAllUsers() {
    return this.prisma.users.deleteMany();
  }
}
