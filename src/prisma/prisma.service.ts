import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";



@Injectable()
export class PrismaServices extends PrismaClient implements OnModuleInit {
    onModuleInit() {
        this.$connect()
        .then(()=> console.log('Connect To DB')
        )
        .catch((err)=> {
            console.log("Error Connecting to DB", err);
            
        })
    }
}