> > USEED SETUP <<>>

1. run yarn install
2. if change data base make sure to de update in file schema.prisma and env
3. run migration but previous if to change type db, you have to run rm -rf prisma/migrations to remove previous migration,
4. after that run npx prisma migrate dev --name init
5. finally, you can to run yarn start:dev to development
6. enjoyyy
