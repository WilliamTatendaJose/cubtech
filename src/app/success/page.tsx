import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();
  const [message, setMessage] = useState('Checking payment status...');

  useEffect(() => {
    // Assume the pollUrl is passed as a query parameter
    const pollUrl = router.query.pollUrl as string;

    if (pollUrl) {
      checkPaymentStatus(pollUrl);
    }
  }, [router.query.pollUrl]);

  async function checkPaymentStatus(pollUrl: string) {
    try {
      const response = await fetch(pollUrl);
      const result = await response.json();

      if (result.status === 'Paid') {
        setMessage('Payment successful! Thank you for your order.');
      } else if (result.status === 'Awaiting Delivery') {
        setMessage('Payment is being processed. Please wait...');
      } else {
        setMessage('Payment failed or canceled. Please try again.');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setMessage('Unable to check payment status. Please contact support.');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">{message}</h1>
      <button
        onClick={() => router.push('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
