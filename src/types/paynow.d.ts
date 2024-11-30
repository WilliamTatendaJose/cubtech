declare module 'paynow' {
  interface PaymentResponse {
    success: boolean;
    pollUrl?: string;
    error?: string;
  }

  interface Payment {
    add(name: string, amount: number): void;
  }

  class Paynow {
    constructor(options: {
      integrationId: string;
      integrationKey: string;
      resultUrl: string;
      returnUrl: string;
    });

    createPayment(reference: string, email: string): Payment;
    sendMobile(
      payment: Payment,
      phoneNumber: string,
      method: string
    ): Promise<PaymentResponse>;
  }

  export default Paynow;
}
