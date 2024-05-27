import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserServices } from "./user.service";
import { CreateUserDto } from "./dtos/CreateUser.dto";


@Controller('users')
export class UserControllers {
    constructor(private userService: UserServices){}
    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto){
         return this.userService.createUser(createUserDto)
    }

    @Get()
    getUsers(){
      return  this.userService.getUsers()
    }
}