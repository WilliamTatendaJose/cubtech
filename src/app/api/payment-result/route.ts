import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { status, reference, paynowreference, amount } = body;

    console.log('Paynow Callback:', body); // Log incoming callback for debugging

    // Handle different payment statuses
    if (status === 'Paid') {
      // Payment successful, update order status in your database
      console.log(`Payment successful: ${reference}`);
      return NextResponse.json({ 
        message: 'Payment confirmed', 
        paynowreference, 
        amount 
      }, { status: 200 });
    } else if (status === 'Awaiting Delivery') {
      // Payment is still processing
      console.log(`Payment pending: ${reference}`);
      return NextResponse.json({ 
        message: 'Payment pending' 
      }, { status: 200 });
    } else {
      // Payment failed or canceled
      console.log(`Payment failed: ${reference}`);
      return NextResponse.json({ 
        message: 'Payment failed or canceled' 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error handling payment result:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}