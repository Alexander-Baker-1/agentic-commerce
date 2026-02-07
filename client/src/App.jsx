import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Cart from './components/Cart';
import ProductCard from './components/ProductCard';

function App() {
  const [userIntent, setUserIntent] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleIntentParsed = async (intent) => {
    setUserIntent(intent);
    setLoading(true);

    try {
      // Search and rank products based on intent
      const response = await fetch('http://localhost:5000/api/search/outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: intent })
      });

      const data = await response.json();

      if (data.success && data.outfit) {
        setProducts(data.outfit.items);
        
        // Optionally auto-add to cart
        if (data.outfit.withinBudget) {
          setCartItems(data.outfit.items);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-blue-600">
            🎿 Agentic Ski Shop
          </h1>
          <p className="text-gray-600 text-sm">
            AI-powered shopping across multiple retailers
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-140px)]">
          {/* Chat Interface */}
          <div className="lg:col-span-1">
            <ChatInterface onIntentParsed={handleIntentParsed} />
          </div>

          {/* Products & Cart */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Cart */}
            <div className="h-1/2">
              <Cart
                items={cartItems}
                total={cartTotal}
                onRemove={handleRemoveFromCart}
              />
            </div>

            {/* Products */}
            <div className="h-1/2 bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                Recommended Products
                {userIntent && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Budget: ${userIntent.budget})
                  </span>
                )}
              </h2>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <p className="text-lg">No products yet</p>
                  <p className="text-sm mt-2">
                    Chat with the assistant to find skiing gear!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      inCart={cartItems.some(item => item.id === product.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;