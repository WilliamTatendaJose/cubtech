import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { amount, paymentMethod, orderId, email, phoneNumber } = await request.json();

    const paynowUrl = 'https://www.paynow.co.zw/Payment/Submit';
    const paynowApiKey = '0f7022d9-fb89-4297-ad03-5f8c6ebfd7a3'; // Replace with your actual Paynow API key
    const paynowShortcode = '19640'; // Replace with your Paynow shortcode

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
