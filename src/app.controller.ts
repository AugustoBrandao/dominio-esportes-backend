import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/criar-pix')
  async criarPix(): Promise<any> {
    return await this.appService.criarPix(100.00, 'augustobrandao.99@outlook.com');
  }

  @Post('/process_payment')
  async cardPayment(@Body() body: any): Promise<any> {
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
    return "Hello World - It's working";
  }
}
