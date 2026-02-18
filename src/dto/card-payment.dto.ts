export interface IdentificationDto {
    type: string;
    number: string;
  }
  
  export interface PayerDto {
    email: string;
    identification: IdentificationDto;
  }
  
  export class CardPaymentDto {
    transaction_amount: number;
    token: string;
    description: string;
    installments: number;
    payment_method_id: string;
    issuer_id: number;
    payer: PayerDto;
  }