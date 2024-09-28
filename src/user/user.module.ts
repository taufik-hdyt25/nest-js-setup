import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserControllers } from './user.controller';
import { UserServices } from './user.service';
import { AuthControllers } from 'src/auth/auth.controller';
import { JwtModules } from 'src/constants';

@Module({
  imports: [PrismaModule, JwtModules],
  controllers: [UserControllers, AuthControllers],
  providers: [UserServices],
})
export class UserModule {}
