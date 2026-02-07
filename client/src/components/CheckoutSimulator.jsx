import React from 'react';
import { useState } from 'react';

function CheckoutSimulator({ cartItems, total, onClose }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Group items by retailer
  const byRetailer = cartItems.reduce((acc, item) => {
    if (!acc[item.retailer]) {
      acc[item.retailer] = { items: [], subtotal: 0 };
    }
    acc[item.retailer].items.push(item);
    acc[item.retailer].subtotal += item.price;
    return acc;
  }, {});

  const retailers = Object.keys(byRetailer);

  const steps = [
    { name: 'Customer Info', icon: '👤' },
    { name: 'Payment', icon: '💳' },
    ...retailers.map(r => ({ name: `${r} Checkout`, icon: '🛒' })),
    { name: 'Confirmation', icon: '✅' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const renderStepContent = () => {
    // Step 0: Customer Info
    if (step === 0) {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
            ℹ️ This information will be auto-filled for all retailers
          </div>
        </div>
      );
    }

    // Step 1: Payment
    if (step === 1) {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Payment Information</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleInputChange}
            maxLength="16"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleInputChange}
              maxLength="5"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleInputChange}
              maxLength="3"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800">
            ✅ Payment info will be securely used for all {retailers.length} retailers
          </div>
        </div>
      );
    }

    // Steps 2+: Retailer checkouts
    if (step >= 2 && step < steps.length - 1) {
      const retailerIndex = step - 2;
      const retailer = retailers[retailerIndex];
      const retailerData = byRetailer[retailer];

      return (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">{retailer} Checkout</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="text-sm text-gray-600">Auto-filling your information...</p>
            <div className="space-y-1 text-sm">
              <p>📦 Ship to: {formData.name || 'Your Name'}</p>
              <p>📍 Address: {formData.address || 'Your Address'}, {formData.city || 'City'}</p>
              <p>💳 Payment: •••• {formData.cardNumber.slice(-4) || '****'}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="font-semibold mb-2">Items from {retailer}:</p>
            {retailerData.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>{item.name}</span>
                <span className="font-semibold">${item.price}</span>
              </div>
            ))}
            <div className="border-t mt-2 pt-2 flex justify-between font-bold">
              <span>Subtotal:</span>
              <span>${retailerData.subtotal}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 animate-pulse">
            🤖 Agent is completing checkout at {retailer}...
          </div>
        </div>
      );
    }

    // Final step: Confirmation
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-600">Order Complete!</h3>
        <p className="text-gray-600">
          Your skiing outfit has been ordered from {retailers.length} retailer{retailers.length > 1 ? 's' : ''}
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
          <p className="font-semibold">Order Summary:</p>
          {retailers.map(retailer => (
            <div key={retailer} className="flex justify-between text-sm">
              <span>{retailer}</span>
              <span className="font-semibold">${byRetailer[retailer].subtotal}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-blue-600">${total}</span>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>✅ Payment processed once</p>
          <p>✅ Shipping info auto-filled for all retailers</p>
          <p>✅ {cartItems.length} items ordered</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Multi-Retailer Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {steps.map((s, idx) => (
              <div key={idx} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    idx <= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {s.icon}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-8 h-1 ${
                      idx < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {steps[step].name}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-between">
          {step < steps.length - 1 ? (
            <>
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="px-6 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {step === steps.length - 2 ? 'Place Order' : 'Continue'}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutSimulator;