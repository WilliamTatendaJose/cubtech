import { NextApiRequest, NextApiResponse } from 'next';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { status, reference, paynowreference, amount } = req.body;

    console.log('Paynow Callback:', req.body); // Log incoming callback for debugging

    // Handle different payment statuses
    if (status === 'Paid') {
      // Payment successful, update order status in your database
      console.log(`Payment successful: ${reference}`);
      res.status(200).json({ message: 'Payment confirmed', paynowreference, amount });
    } else if (status === 'Awaiting Delivery') {
      // Payment is still processing
      console.log(`Payment pending: ${reference}`);
      res.status(200).json({ message: 'Payment pending' });
    } else {
      // Payment failed or canceled
      console.log(`Payment failed: ${reference}`);
      res.status(400).json({ message: 'Payment failed or canceled' });
    }
  } catch (error) {
    console.error('Error handling payment result:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}