import { Paynow } from 'paynow';
import crypto from 'crypto';

const integrationId = process.env.PAYNOW_INTEGRATION_ID || '';
const integrationKey = process.env.PAYNOW_INTEGRATION_KEY || '';

function generateHash(values, integrationKey) {
  // Ensure all values are converted to strings and trimmed
  const processedValues = values.map(val => String(val).trim());
  const hashString = processedValues.join('') + integrationKey;
  
  return crypto
    .createHash('sha512')
    .update(hashString)
    .digest('hex')
    .toLowerCase();
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, total, mobilePaymentDetails } = body;

    // Validation checks
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

    // Initialize Paynow instance
    const paynow = new Paynow(integrationId, integrationKey);

    // Set URLs for result and return
    paynow.resultUrl = `${process.env.BASE_URL}/api/payment-result`;
    paynow.returnUrl = `${process.env.BASE_URL}/success`;

    // Create a new Paynow Payment
    const payment = paynow.createPayment(`Order-${Date.now()}`, email);
    payment.add('Order Total', total);

    // Hash generation with precise logging
    const hashValues = [
      integrationId,
      payment.reference,
      `${total}`,
    ];

    const hash = generateHash(hashValues, integrationKey);

    console.log('Detailed Hash Generation:');
    console.log('Integration ID:', integrationId);
    console.log('Payment Reference:', payment.reference);
    console.log('Total:', total);
    console.log('Integration Key:', integrationKey);
    console.log('Hash Values:', hashValues);
    console.log('Generated Hash:', hash);

    try {
      // Initiate the mobile payment
      const mobileResponse = await paynow.sendMobile(
        payment, 
        phoneNumber, 
        paymentMethod, 
        hash
      );

      // Enhanced logging of mobile response
      console.log('Full Mobile Response:', JSON.stringify(mobileResponse, null, 2));

      // Comprehensive error checking
      if (!mobileResponse) {
        throw new Error('No response received from Paynow');
      }

      if (mobileResponse.success) {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Payment initiated successfully',
            reference: payment.reference,
            pollUrl: mobileResponse.pollUrl,
          }),
          { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      } else {
        // Log specific error details
        console.error('Paynow Payment Initiation Failed:', {
          errorMessage: mobileResponse.errorMessage,
          status: mobileResponse.status,
        });

        return new Response(
          JSON.stringify({
            success: false,
            error: mobileResponse.errorMessage || 'Unknown Paynow error',
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (paymentError) {
      console.error('Paynow Payment Error:', paymentError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: paymentError.message || 'Payment initiation failed' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Mobile Payment Route Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
