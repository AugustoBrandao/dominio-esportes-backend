Utilizar SDK Mercado Pago
- npm install --save mercadopago

//Utilizar (docker+postgreSQL)
- criação do arquivo docker-compose.yml
- docker compose up -d //subir a imagem
- docker ps //listar todos os containeres rodando
- docker logs [ID_CONTAINER] -> LOG:  database system is ready to accept connections

Utilizar o prisma
1- npm install prisma
2- npx prisma init // inicializar o prisma -> criação do schema do banco de dados
3- Preencher o schema.prisma
4- Alterar a variável de ambiente .env
5- Gerar a migration: 
      npx prisma migrate dev --name [NOME DA MIGRATION]
6- NPX prisma studio -> abrir o SGBD do prisma
7- nest g service prisma
7- Criar o PrismaService