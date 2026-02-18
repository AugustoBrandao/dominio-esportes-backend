import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from "mercadopago"; // npm install --save mercadopago
import { PrismaService } from './prisma/prisma.service'; // 
import { CreatePixDto } from './dto/create-pix.dto';
import { ConfigService } from '@nestjs/config';
import { generateIdempotencyKey } from './helpers/generate-indempotence-key';
import { IPixResponse } from './interfaces/pix-response.interface';
import { CardPaymentDto } from './dto/card-payment.dto';
import generateCadastroId from './helpers/generate-cadastro-id.helper';

// npm install -g localtunnel
// lt --port 3100

@Injectable()
export class AppService {
  private payment: Payment;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    // Step 1: Initialize the client object
    const client = new MercadoPagoConfig({
      accessToken: this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN')!,
      options: { timeout: Number(this.configService.get('MERCADO_PAGO_TIMEOUT')) },
    });

    // Step 2: Initialize the API object
    this.payment = new Payment(client);
  }

  // Pix payment method
  async criarPix(dto: CreatePixDto): Promise<IPixResponse> { 

    // Step 3: Create the request object
    const body = {
      transaction_amount: dto.amount,
      description: `Pagamento Pix no valor de ${dto.amount}`,
      payment_method_id: 'pix',
      payer: {
        email: dto.userEmail,
      }
    };

    try {
      const result = await this.payment.create({ 
        body, 
        requestOptions: {
          idempotencyKey: generateIdempotencyKey(),
        }
      });

      const data = result.point_of_interaction?.transaction_data;

      if (!data || !data.qr_code || !data.qr_code_base64 || !data.ticket_url ) { 
        throw new InternalServerErrorException('Erro ao gerar dados do PIX no Mercado Pago.'); 
      }
    
      return {
        qr_code: data?.qr_code ?? null,
        qr_code_base64: data?.qr_code_base64 ?? null,
        ticket_url: data?.ticket_url ?? null,
      };
    } catch (error) {
      console.error('Erro ao criar PIX:', error);
      throw new InternalServerErrorException('Erro ao criar pagamento PIX.');
    }
  }

  // Card payment method
  async cardPayment(dto: CardPaymentDto): Promise<any> {

    const result = await this.payment.create({
      body: dto,
      requestOptions: {
        idempotencyKey: generateIdempotencyKey(),
      },
    });
  
    return result;
  }  

  //Get all
  async getFiliados() {
    return this.prismaService.filiado.findMany();
  }


  async createFiliado(payload: any) {
    const { filiado, pix } = payload;

    //helper
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
