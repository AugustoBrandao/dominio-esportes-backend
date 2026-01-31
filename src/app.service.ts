import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from "mercadopago"; // npm install --save mercadopago
import { PrismaService } from './prisma/prisma.service'; // 

// npm install -g localtunnel
// lt --port 3100

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async criarPix(amount: number, userEmail: string): Promise<any> {
    // Step 2: Initialize the client object
    const client = new MercadoPagoConfig({
      accessToken: "TEST-4238725792701730-012413-f10863abb808aca26832fd8b07a238c6-1582689955",
      options: { timeout: 5000 },
    });

    // Step 3: Initialize the API object
    const payment = new Payment(client);  

    // Step 4: Create the request object
    const body = {
      transaction_amount: amount,
      description: `Pagamento Pix no valor de ${amount}`,
      payment_method_id: 'pix',
      payer: {
        email: userEmail,
      }
    };

    //Gerar uma sequência randômica de letras e números
    const generateCode = () => {
      const numbers = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 10)
      ).join('');
    
      const letters = Array.from({ length: 4 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      ).join('');
    
      return `${numbers}${letters}`;
    };

    const requestOptions = {
      idempotencyKey: generateCode(),
    }

    try {
      const result = await payment.create({ body, requestOptions });
    
      return {
        qr_code: result.point_of_interaction?.transaction_data?.qr_code ?? null,
        qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64 ?? null,
        ticket_url: result.point_of_interaction?.transaction_data?.ticket_url ?? null,
      };
    } catch (error) {
      console.log('ERRO ===> ', error);
      throw error;
    }
  }

  async cardPayment(body: any): Promise<any> {
    const client = new MercadoPagoConfig({
      accessToken: 'TEST-4238725792701730-012413-f10863abb808aca26832fd8b07a238c6-1582689955',
    });
  
    const generateCode = () => {
      const numbers = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 10)
      ).join('');
  
      const letters = Array.from({ length: 4 }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      ).join('');
  
      return `${numbers}${letters}`;
    };
  
    const payment = new Payment(client);
    console.log(body);
    const result = await payment.create({
      body: {
        transaction_amount: body.transaction_amount,
        token: body.token,
        description: body.description,
        installments: body.installments,
        payment_method_id: body.payment_method_id,
        issuer_id: body.issuer_id,
        payer: {
          email: body.payer.email,
          identification: {
            type: body.payer.identification.type,
            number: body.payer.identification.number,
          },
        },
      },
      requestOptions: {
        idempotencyKey: generateCode(),
      },
    });
  
    return result;
  }  

  async getFiliados() {
    return this.prismaService.filiado.findMany();
  }


  async createFiliado(payload: any) {
    const { filiado, pix } = payload;

    const generateCadastroId = () => {
      const now = new Date();
      const pad = (n, size = 2) => String(n).padStart(size, "0");
      const day = pad(now.getDate());
      const month = pad(now.getMonth() + 1);
      const year = String(now.getFullYear()).slice(-2);
      const hour = pad(now.getHours());
      const minute = pad(now.getMinutes());
      const second = pad(now.getSeconds());
      const ms = pad(now.getMilliseconds(), 3);
    
      return `${day}${month}${year}${hour}${minute}${second}${ms}`;
    };

    const id_cadastro = generateCadastroId();
  
    return this.prismaService.filiado.create({
      data: {
        id_cadastro,
        nome: payload.nome,
        endereco: payload.endereco,
        celular: payload.celular,
        nascimento: new Date(payload.nascimento),
        sexo: payload.sexo,
        pix: pix,
        escolaridade: payload.escolaridade,
        email: payload.email,
  
        modalidade_esportiva: payload.modalidade,
        academia_clube_empresa: payload.instituicao,
        endereco_instituicao: payload.enderecoInstituicao,
        telefone: payload.telefoneInstituicao,
        email_instituicao: payload.emailInstituicao,
        tipo_instituicao: payload.tipoFiliacao,
      },
    });
  }
  
}
