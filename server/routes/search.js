const express = require('express');
const router = express.Router();
const retailerAdapter = require('../services/retailerAdapter');
const rankingEngine = require('../services/rankingEngine');

/**
 * GET /api/search
 * Search products across all retailers with filters
 */
router.get('/', async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      size: req.query.size,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      maxDeliveryDays: req.query.maxDeliveryDays ? parseInt(req.query.maxDeliveryDays) : undefined,
      color: req.query.color
    };

    // Remove undefined filters
    Object.keys(filters).forEach(key => 
      filters[key] === undefined && delete filters[key]
    );

    const products = await retailerAdapter.searchProducts(filters);

    res.json({
      success: true,
      count: products.length,
      products,
      filters
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/search/rank
 * Search and rank products based on user preferences
 */
router.post('/rank', async (req, res) => {
  try {
    const { filters, preferences } = req.body;

    // Search for products
    const products = await retailerAdapter.searchProducts(filters || {});

    // Rank products
    const rankedProducts = rankingEngine.rankProducts(products, preferences || {});

    res.json({
      success: true,
      count: rankedProducts.length,
      products: rankedProducts,
      preferences
    });

  } catch (error) {
    console.error('Rank error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/search/outfit
 * Find best complete outfit within budget
 */
router.post('/outfit', async (req, res) => {
  try {
    const { preferences } = req.body;

    // Get all products
    const allProducts = await retailerAdapter.getAllProducts();

    // Rank all products
    const rankedProducts = rankingEngine.rankProducts(allProducts, preferences);

    // Find best outfit combination
    const outfit = rankingEngine.findBestOutfit(rankedProducts, preferences);

    res.json({
      success: true,
      outfit,
      totalItems: outfit.items.length,
      withinBudget: outfit.withinBudget
    });

  } catch (error) {
    console.error('Outfit search error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/search/adapter-info
 * Get info about current data adapter
 */
router.get('/adapter-info', (req, res) => {
  const info = retailerAdapter.adapterInfo();
  res.json({
    success: true,
    adapter: info
  });
});

module.exports = router;