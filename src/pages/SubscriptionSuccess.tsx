import React from 'react';
import { CheckCircle, Home, Mail, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionSuccess() {
    const navigate = useNavigate();
  const handleBackToHome = () => {
    // Navigate back to home page
    console.log('Navigating to home page...');
    // In a real app, you would use router navigation like:
    navigate('/')
  };

  return (
    <div className=" flex min-h-[calc(100vh-220px)] items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Subscription Successful!
          </h1>
          <p className="text-gray-600">
            Welcome to our premium community! Your subscription is now active.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What's next?
          </h2>
          <div className="space-y-3">
            {/* <div className="flex items-center text-left">
              <Mail className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
              <span className="text-gray-700">Check your email for confirmation details</span>
            </div> */}
            <div className="flex items-center text-left">
              <Gift className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
              <span className="text-gray-700">Access all premium features instantly</span>
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        {/* <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="text-sm text-blue-800">
            <div className="flex justify-between items-center mb-1">
              <span>Plan:</span>
              <span className="font-semibold">Premium Monthly</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span>Next billing:</span>
              <span className="font-semibold">July 21, 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Amount:</span>
              <span className="font-semibold">$9.99/month</span>
            </div>
          </div>
        </div> */}

        {/* Back to Home Button */}
        <button
          onClick={handleBackToHome}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Footer Text */}
        <p className="text-xs text-gray-500 mt-4">
          Need help? Contact our support team anytime.
        </p>
      </div>
    </div>
  );
}