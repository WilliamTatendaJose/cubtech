"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Success = () => {
  const router = useRouter();
  const [message, setMessage] = useState('Checking payment status...');
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve payment reference from localStorage
    const storedReference = localStorage.getItem('paymentReference');
    if (storedReference) {
      setPaymentReference(storedReference);
      checkPaymentStatus(storedReference);
      
      // Clean up the stored reference
      localStorage.removeItem('paymentReference');
    } else {
      // If no reference found, redirect or show error
      setMessage('No payment information found. Redirecting...');
      setTimeout(() => router.push('/'), 3000);
    }
  }, [router]);

  async function checkPaymentStatus(reference: string) {
    try {
      const response = await fetch(`/api/payment-status?reference=${reference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment status');
      }

      const result = await response.json();

      switch (result.status) {
        case 'Paid':
          setMessage('Payment successful! Thank you for your order.');
          break;
        case 'Awaiting Delivery':
          setMessage('Payment is being processed. Please wait...');
          break;
        default:
          setMessage('Payment failed or canceled. Please try again.');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setMessage('Unable to check payment status. Please contact support.');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">{message}</h1>
      {paymentReference && (
        <div className="mt-4 text-gray-600">
          Reference: {paymentReference}
        </div>
      )}
      <button
        onClick={() => router.push('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;