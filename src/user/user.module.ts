import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserControllers } from "./user.controller";
import { UserServices } from "./user.service";


@Module({
    imports: [PrismaModule],
    controllers: [UserControllers],
    providers: [UserServices]
})
export class UserModule{}