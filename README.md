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
6- npx prisma studio -> abrir o SGBD do prisma
7- nest g service prisma
7- Criar o PrismaService

VERCEL
npm install -g vercel -> instalar globalmente
vercel .

DOCKERIZANDO A APLICAÇÃO
-> Criar o Dockerfile
-> docker build -t dominio-esportes-backend .
-> docker image ls -> listar todas as imagens docker
-> docker run -dp 127.0.0.1:3100:3100 dominio-esportes-backend -> vai retornar um id -> Cria e inicia um container a partir de uma imagem.
-> FAZER UMA NETWORK PARA COMUNICAÇÃO ENTRE CONTAINERES -> FRONTEND -> BACKEND -> BD
      -> docker network create dominio-esportes-network -> criar a network
      -> atualizar a imagem da dominio-esportes-backend -> deletar imagem e container
      -> subir o container na rede dominio-esportes-network:
            - docker run -d --name dominio-esportes-backend --network dominio-esportes-network -p 127.0.0.1:3100:3100 dominio-esportes-image
