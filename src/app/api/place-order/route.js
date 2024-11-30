import { NextResponse } from 'next/server';
import axios from 'axios';

const integrationId = process.env.PAYNOW_INTEGRATION_ID || '';
const integrationKey = process.env.PAYNOW_INTEGRATION_KEY || '';
export async function POST(request) {

  try {
    const { amount, paymentMethod, orderId, email, phoneNumber } = await request.json();

    const paynowUrl = 'https://www.paynow.co.zw/Payment/Submit';
    const paynowApiKey = integrationId; // Replace with your actual Paynow API key
    const paynowShortcode = integrationKey; // Replace with your Paynow shortcode

    const paymentData = {
      shortcode: paynowShortcode,
      amount: amount,
      orderReference: orderId,
      email: email,
      phoneNumber: phoneNumber,
      paymentMethod: paymentMethod,
    };

    const headers = {
      'Authorization': `Bearer ${paynowApiKey}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(paynowUrl, paymentData, { headers });

    if (response.status === 200) {
      return NextResponse.json({ success: true, message: 'Payment processed successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Payment failed' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error processing Paynow payment:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
