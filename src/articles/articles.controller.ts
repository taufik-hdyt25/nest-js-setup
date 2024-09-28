import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { buildResponse } from 'src/helpers/response';
import { JwtAuthGuard } from 'src/middlewares/jwt';
import { ArticlesServices } from './articles.service';
import { CreateArticlesDto } from './dtos/CreateArticles.dto';

@Controller('articles')
export class ArticlesControllers {
  constructor(private articlesService: ArticlesServices) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createArticlesDto: CreateArticlesDto) {
    try {
      const newUser =
        await this.articlesService.createArticles(createArticlesDto);
      return buildResponse(
        true,
        'Articles created successfully',
        newUser,
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new HttpException(
        buildResponse(
          false,
          'Internal server error',
          error.message,
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getArticles() {
    try {
      const users = await this.articlesService.getArticles();
      if (!users.length) {
        return buildResponse(true, 'Data empty', users, HttpStatus.NOT_FOUND);
      }
      return buildResponse(
        true,
        'User successfully',
        users,
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw new HttpException(
        buildResponse(
          false,
          'Internal server error',
          error.message,
          HttpStatus.BAD_REQUEST,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getArticle(@Param('id') id: number) {
    try {
      const idArticle = Number(id);
      const articles = await this.articlesService.getArticlesById(idArticle);
      if (!articles) {
        return buildResponse(
          false,
          'Articles not found',
          null,
          HttpStatus.NOT_FOUND,
        );
      }

      return buildResponse(
        true,
        'User retrieved successfully',
        articles,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(
        buildResponse(
          false,
          'Internal server error',
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteArticlesById(@Param('id') id: number) {
    try {
      const idArticles = Number(id);
      await this.articlesService.deleteArticleById(idArticles);
      return buildResponse(true, 'Delete Articles Succes', null, HttpStatus.OK);
    } catch (error) {
      buildResponse(
        false,
        'Internal Server Error',
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete()
  async deleteAllUsers() {
    try {
      await this.articlesService.deleteAllArticles();

      return buildResponse(
        true,
        'Delete All successfully',
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(
        buildResponse(
          false,
          'Internal server error',
          null,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
