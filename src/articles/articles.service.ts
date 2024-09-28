import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaServices } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesServices {
  constructor(private prisma: PrismaServices) {}

  createArticles(createUserData: Prisma.articlesCreateInput) {
    return this.prisma.articles.create({ data: createUserData });
  }

  getArticles() {
    return this.prisma.articles.findMany();
  }
  getArticlesById(id: number) {
    return this.prisma.articles.findUnique({
      where: {
        id: id,
      },
    });
  }
  deleteArticleById(id: number) {
    return this.prisma.articles.delete({
      where: {
        id: id,
      },
    });
  }

  deleteAllArticles() {
    return this.prisma.articles.deleteMany();
  }
}
