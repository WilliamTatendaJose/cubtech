
import Paynow from 'paynow';

export async function GET() {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'Missing reference' }, { status: 400 });
  }

  try {
    const integrationId = process.env.PAYNOW_INTEGRATION_ID || '';
    const integrationKey = process.env.PAYNOW_INTEGRATION_KEY || '';

    // Initialize Paynow instance
    const paynow = new Paynow(integrationId, integrationKey);

    // Check payment status
    const status = await paynow.checkTransactionStatus(reference);

    return NextResponse.json({ 
      status: status.status,
      amount: status.amount,
      reference: status.reference
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json({ 
      error: 'Failed to retrieve payment status' 
    }, { status: 500 });
  }
}