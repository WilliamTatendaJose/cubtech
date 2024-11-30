import { Paynow } from 'paynow';
import crypto from 'crypto';

const integrationId = process.env.PAYNOW_INTEGRATION_ID || '';
const integrationKey = process.env.PAYNOW_INTEGRATION_KEY || '';

// Initialize Paynow instance
const paynow = new Paynow(integrationId, integrationKey);

paynow.resultUrl = `${process.env.BASE_URL}/api/payment-result`; // Callback URL
paynow.returnUrl = `${process.env.BASE_URL}/success`; // Success redirect URL

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, total, mobilePaymentDetails } = body;

    // Ensure mobilePaymentDetails exists and extract paymentMethod and phoneNumber
    if (!mobilePaymentDetails) {
      return new Response(
        JSON.stringify({ error: 'Missing mobile payment details' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { paymentMethod, phoneNumber } = mobilePaymentDetails;

    if (!paymentMethod || !phoneNumber || !total || !name || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new Paynow Payment
    const payment = paynow.createPayment(`Order-${Date.now()}`, email);
    payment.add('Order Total', total);

    // Generate the hash
    const hash = crypto.createHash('sha512');
    hash.update(`${integrationId}${payment.reference}`);
    const hashed = hash.digest('hex');

    // Initiate the mobile payment
    const mobileResponse = await paynow.sendMobile(payment, phoneNumber, paymentMethod, hashed);

    // Handle undefined or error response
    if (!mobileResponse) {
      console.error('Paynow mobile response is undefined:', mobileResponse);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to initiate payment. No response from Paynow.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (mobileResponse.success) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Payment initiated successfully',
          pollUrl: mobileResponse.pollUrl, // URL to check the status
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Handle specific Paynow error response
      console.error('Paynow payment initiation failed:', mobileResponse);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to initiate payment: ${mobileResponse.errorMessage || 'Unknown error'}`,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Mobile payment error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}