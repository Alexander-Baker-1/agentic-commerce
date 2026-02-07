const express = require('express');
const router = express.Router();

// In-memory cart storage (in production, use database or session storage)
const carts = new Map();

/**
 * GET /api/cart/:sessionId
 * Get cart for a session
 */
router.get('/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const cart = carts.get(sessionId) || { items: [], total: 0 };

    // Group by retailer
    const byRetailer = {};
    cart.items.forEach(item => {
      if (!byRetailer[item.retailer]) {
        byRetailer[item.retailer] = {
          items: [],
          subtotal: 0
        };
      }
      byRetailer[item.retailer].items.push(item);
      byRetailer[item.retailer].subtotal += item.price;
    });

    res.json({
      success: true,
      cart: {
        ...cart,
        byRetailer,
        itemCount: cart.items.length
      }
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/cart/:sessionId/add
 * Add item to cart
 */
router.post('/:sessionId/add', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({
        success: false,
        error: 'Product is required'
      });
    }

    // Get or create cart
    let cart = carts.get(sessionId) || { items: [], total: 0 };

    // Add item
    cart.items.push(product);
    cart.total += product.price;

    // Save cart
    carts.set(sessionId, cart);

    res.json({
      success: true,
      cart,
      message: `Added ${product.name} to cart`
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/cart/:sessionId/remove/:productId
 * Remove item from cart
 */
router.delete('/:sessionId/remove/:productId', (req, res) => {
  try {
    const { sessionId, productId } = req.params;

    let cart = carts.get(sessionId);
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found'
      });
    }

    // Find and remove item
    const itemIndex = cart.items.findIndex(item => item.id === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart'
      });
    }

    const removedItem = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);
    cart.total -= removedItem.price;

    // Save cart
    carts.set(sessionId, cart);

    res.json({
      success: true,
      cart,
      message: `Removed ${removedItem.name} from cart`
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/cart/:sessionId
 * Clear cart
 */
router.delete('/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    carts.delete(sessionId);

    res.json({
      success: true,
      message: 'Cart cleared'
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/cart/:sessionId/bulk-add
 * Add multiple items at once (for outfit finder)
 */
router.post('/:sessionId/bulk-add', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        error: 'Products array is required'
      });
    }

    // Get or create cart
    let cart = carts.get(sessionId) || { items: [], total: 0 };

    // Add all items
    products.forEach(product => {
      cart.items.push(product);
      cart.total += product.price;
    });

    // Save cart
    carts.set(sessionId, cart);

    res.json({
      success: true,
      cart,
      message: `Added ${products.length} items to cart`
    });

  } catch (error) {
    console.error('Bulk add error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;