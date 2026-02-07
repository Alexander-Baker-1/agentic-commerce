function ProductCard({ product, onAddToCart, inCart }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
        
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product.retailer}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="text-sm text-gray-600 mb-3 space-y-1">
          <p>Size: {product.size}</p>
          <p>Delivery: {product.delivery_days} days</p>
          {product.specs?.waterproof_rating && (
            <p>Waterproof: {product.specs.waterproof_rating}</p>
          )}
        </div>
        
        {product.score && (
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${product.score * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-600">
                {Math.round(product.score * 100)}%
              </span>
            </div>
            {product.explanation && (
              <p className="text-xs text-gray-500 mt-1 italic">
                {product.explanation}
              </p>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={inCart}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              inCart
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {inCart ? 'In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  }
  
  export default ProductCard;