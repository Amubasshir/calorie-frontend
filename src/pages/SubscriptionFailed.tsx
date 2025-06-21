import React from 'react';
import { XCircle, Home, RefreshCw, HelpCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionFailed() {
    const navigate = useNavigate();
  const handleBackToHome = () => {
    // Navigate back to home page
    console.log('Navigating to home page...');
    // In a real app, you would use router navigation like:
    navigate('/')
  };

  const handleTryAgain = () => {
    // Navigate back to subscription page or retry payment
    console.log('Retrying subscription...');
    // In a real app, you would navigate to subscription page:
    // navigate('/subscribe') or window.location.href = '/subscribe'
  };

  const handleContactSupport = () => {
    // Open support page or contact form
    console.log('Opening support...');
    // In a real app, you might open a support widget or navigate to support page
  };

  return (
    <div className=" flex min-h-[calc(100vh-220px)] items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Failed
          </h1>
          <p className="text-gray-600">
            We couldn't process your payment. Don't worry, you haven't been charged.
          </p>
        </div>

        {/* Common Issues Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Common issues:
          </h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">Insufficient funds or expired card</span>
            </div>
            <div className="flex items-start">
              <XCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">Incorrect billing information</span>
            </div>
            <div className="flex items-start">
              <HelpCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">Bank declined the transaction</span>
            </div>
          </div>
        </div>

        {/* Error Details */}
        {/* <div className="bg-red-50 rounded-xl p-4 mb-6">
          <div className="text-sm text-red-800">
            <div className="flex justify-between items-center mb-1">
              <span>Error Code:</span>
              <span className="font-mono font-semibold">PAYMENT_DECLINED</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span>Attempted:</span>
              <span className="font-semibold">June 21, 2025 2:45 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Amount:</span>
              <span className="font-semibold">$9.99</span>
            </div>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleTryAgain}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={handleContactSupport}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Contact Support</span>
          </button>

          <button
            onClick={handleBackToHome}
            className="w-full bg-white hover:bg-gray-50 text-gray-600 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-gray-500">
          Your payment information is secure and encrypted. No charges were made to your account.
        </p>
      </div>
    </div>
  );
}