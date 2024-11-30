import { NextResponse } from 'next/server';
import axios from 'axios';

const integrationId = process.env.PAYNOW_INTEGRATION_ID || '';
const integrationKey = process.env.PAYNOW_INTEGRATION_KEY || '';

export async function POST(request) {
  try {
    const { amount, orderId, email, cardNumber, expiryDate, cvv } = await request.json();

    const paynowUrl = 'https://www.paynow.co.zw/Payment/Submit';
     const paynowApiKey = integrationId; // Replace with your actual Paynow API key
    const paynowShortcode = integrationKey; // Replace with your Paynow shortcode
    // Prepare payment data for card payments
    const paymentData = {
      shortcode: paynowShortcode,
      amount: amount,
      orderReference: orderId,
      email: email,
      paymentMethod: 'card', // Use 'card' to specify card payments
      cardNumber: cardNumber,
      expiryDate: expiryDate, // Format: MM/YY
      cvv: cvv,
    };

    const headers = {
      'Authorization': `Bearer ${paynowApiKey}`,
      'Content-Type': 'application/json',
    };

    // Send request to Paynow
    const response = await axios.post(paynowUrl, paymentData, { headers });

    if (response.status === 200) {
      return NextResponse.json({ success: true, message: 'Card payment processed successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Card payment failed' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error processing card payment:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
