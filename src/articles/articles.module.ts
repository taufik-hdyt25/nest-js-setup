import { Module } from '@nestjs/common';
import { AuthControllers } from 'src/auth/auth.controller';
import { JwtModules } from 'src/constants';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArticlesControllers } from './articles.controller';
import { ArticlesServices } from './articles.service';

@Module({
  imports: [PrismaModule, JwtModules],
  controllers: [ArticlesControllers],
  providers: [ArticlesServices],
})
export class ArticlesModule {}
