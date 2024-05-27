import { Module } from "@nestjs/common";
import { PrismaServices } from "./prisma.service";


@Module({
    providers: [PrismaServices],
    exports: [PrismaServices]
})

export class PrismaModule{}