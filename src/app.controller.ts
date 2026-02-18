import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePixDto } from './dto/create-pix.dto';
import { CardPaymentDto } from './dto/card-payment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/criar-pix')
  async criarPix(@Body() body: CreatePixDto): Promise<any> {
    return await this.appService.criarPix(body);
  }

  @Post('/process_payment')
  async cardPayment(@Body() body: CardPaymentDto): Promise<any> {
    return await this.appService.cardPayment(body);
  }

  @Post('/create')
  async createFiliado(@Body() body: any): Promise<any> {
    return await this.appService.createFiliado(body);
  }

  @Get('/filiados')
  async getFiliados() {
    return this.appService.getFiliados();
  }  
  
  @Get('/test')
  async teste() {
    return "Hello World - Project is working";
  }
}
