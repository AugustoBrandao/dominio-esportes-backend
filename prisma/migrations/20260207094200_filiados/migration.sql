-- CreateTable
CREATE TABLE "Filiado" (
    "id_cadastro" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "sexo" BOOLEAN NOT NULL,
    "pix" BOOLEAN NOT NULL,
    "escolaridade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "modalidade_esportiva" TEXT NOT NULL,
    "academia_clube_empresa" TEXT NOT NULL,
    "endereco_instituicao" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email_instituicao" TEXT NOT NULL,
    "tipo_instituicao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Filiado_pkey" PRIMARY KEY ("id_cadastro")
);
