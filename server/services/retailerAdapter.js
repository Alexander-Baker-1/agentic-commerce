const mockAdapter = require('../adapters/mockAdapter');
// const realAPIAdapter = require('../adapters/realAPIAdapter'); // TODO: Future
// const scrapingAdapter = require('../adapters/scrapingAdapter'); // TODO: Future

// Configuration - change this to switch data sources
const USE_REAL_DATA = process.env.USE_REAL_DATA === 'true' || false;

function getAdapter() {
  if (USE_REAL_DATA) {
    // return realAPIAdapter; // TODO: Implement real API adapter
    console.warn('Real API adapter not implemented yet, falling back to mock');
    return mockAdapter;
  }
  
  console.log('Using mock data adapter');
  return mockAdapter;
}

// Export the active adapter
const adapter = getAdapter();

module.exports = {
  searchProducts: (filters) => adapter.searchProducts(filters),
  getAllProducts: () => adapter.getAllProducts(),
  getProductById: (id) => adapter.getProductById(id),
  adapterInfo: () => ({
    name: adapter.getName(),
    isRealData: adapter.isRealData()
  })
};