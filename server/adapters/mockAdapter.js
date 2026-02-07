const { searchProducts, getAllProducts } = require('../data/mockProducts');

// Mock adapter - uses local mock data
class MockAdapter {
  async searchProducts(filters) {
    // Simulate API delay for realism
    await this.delay(100);
    
    return searchProducts(filters);
  }

  async getAllProducts() {
    await this.delay(100);
    return getAllProducts();
  }

  async getProductById(id) {
    await this.delay(50);
    const allProducts = getAllProducts();
    return allProducts.find(p => p.id === id);
  }

  // Helper to simulate network delay
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Metadata
  getName() {
    return 'Mock Data Adapter';
  }

  isRealData() {
    return false;
  }
}

module.exports = new MockAdapter();