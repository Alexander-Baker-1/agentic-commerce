function Cart({ items, total, onRemove }) {
    // Group items by retailer
    const byRetailer = items.reduce((acc, item) => {
      if (!acc[item.retailer]) {
        acc[item.retailer] = { items: [], subtotal: 0 };
      }
      acc[item.retailer].items.push(item);
      acc[item.retailer].subtotal += item.price;
      return acc;
    }, {});
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        
        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">Your cart is empty</p>
            <p className="text-sm mt-2">Start chatting to find products!</p>
          </div>
        ) : (
          <>
            {/* Items grouped by retailer */}
            <div className="space-y-6 mb-6">
              {Object.entries(byRetailer).map(([retailer, data]) => (
                <div key={retailer} className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-3 text-blue-600">
                    {retailer}
                  </h3>
                  <div className="space-y-3">
                    {data.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Size: {item.size} • {item.delivery_days} day delivery
                          </p>
                          <p className="text-sm font-semibold text-blue-600 mt-1">
                            ${item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="text-right mt-2 text-sm text-gray-600">
                    Subtotal: ${data.subtotal}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${total}</span>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Proceed to Checkout ({Object.keys(byRetailer).length} retailers)
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default Cart;