// Mock product database for 3 retailers: REI, Backcountry, Amazon

const mockProducts = {
  REI: [
    {
      id: 'rei_jacket_001',
      retailer: 'REI',
      name: "Arc'teryx Beta AR Jacket",
      category: 'jacket',
      price: 599,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '20000mm',
        breathability: '20000g',
        insulation: 'none (shell)',
        weight: '415g',
        temperature_range: '-10°C to 5°C'
      },
      delivery_days: 2,
      in_stock: true,
      rating: 4.8
    },
    {
      id: 'rei_jacket_002',
      retailer: 'REI',
      name: 'Patagonia Powder Bowl Jacket',
      category: 'jacket',
      price: 449,
      size: 'M',
      color: 'navy',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '20000mm',
        breathability: '15000g',
        insulation: '60g synthetic',
        weight: '680g',
        temperature_range: '-15°C to 0°C'
      },
      delivery_days: 3,
      in_stock: true,
      rating: 4.7
    },
    {
      id: 'rei_pants_001',
      retailer: 'REI',
      name: 'Arc\'teryx Sabre Pants',
      category: 'pants',
      price: 349,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '20000mm',
        breathability: '20000g',
        insulation: 'none',
        ventilation: 'inner thigh zips'
      },
      delivery_days: 2,
      in_stock: true,
      rating: 4.9
    },
    {
      id: 'rei_base_001',
      retailer: 'REI',
      name: 'Smartwool Merino Base Layer Top',
      category: 'base_layer',
      price: 89,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        material: '100% merino wool',
        weight: '250gsm',
        warmth: 'medium'
      },
      delivery_days: 2,
      in_stock: true,
      rating: 4.6
    },
    {
      id: 'rei_gloves_001',
      retailer: 'REI',
      name: 'Black Diamond Guide Gloves',
      category: 'gloves',
      price: 129,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof: true,
        insulation: 'PrimaLoft Gold',
        temperature_rating: '-20°C'
      },
      delivery_days: 3,
      in_stock: true,
      rating: 4.5
    },
    {
      id: 'rei_goggles_001',
      retailer: 'REI',
      name: 'Smith I/O Mag Goggles',
      category: 'goggles',
      price: 280,
      size: 'One Size',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        lens_type: 'ChromaPop',
        interchangeable: true,
        anti_fog: true
      },
      delivery_days: 2,
      in_stock: true,
      rating: 4.8
    }
  ],

  Backcountry: [
    {
      id: 'bc_jacket_001',
      retailer: 'Backcountry',
      name: 'The North Face Freedom Jacket',
      category: 'jacket',
      price: 299,
      size: 'M',
      color: 'blue',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '15000mm',
        breathability: '10000g',
        insulation: '80g Heatseeker',
        weight: '750g',
        temperature_range: '-20°C to -5°C'
      },
      delivery_days: 4,
      in_stock: true,
      rating: 4.4
    },
    {
      id: 'bc_jacket_002',
      retailer: 'Backcountry',
      name: 'Mammut Stoney HS Jacket',
      category: 'jacket',
      price: 399,
      size: 'M',
      color: 'gray',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '20000mm',
        breathability: '15000g',
        insulation: '100g PrimaLoft',
        weight: '820g',
        temperature_range: '-25°C to -5°C'
      },
      delivery_days: 3,
      in_stock: true,
      rating: 4.6
    },
    {
      id: 'bc_pants_001',
      retailer: 'Backcountry',
      name: 'Outdoor Research Skyward II Pants',
      category: 'pants',
      price: 199,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '20000mm',
        breathability: '20000g',
        insulation: '60g PrimaLoft',
        ventilation: 'mesh-backed thigh vents'
      },
      delivery_days: 4,
      in_stock: true,
      rating: 4.3
    },
    {
      id: 'bc_base_001',
      retailer: 'Backcountry',
      name: 'Icebreaker 260 Tech Base Layer',
      category: 'base_layer',
      price: 110,
      size: 'M',
      color: 'navy',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        material: '100% merino wool',
        weight: '260gsm',
        warmth: 'high'
      },
      delivery_days: 3,
      in_stock: true,
      rating: 4.7
    },
    {
      id: 'bc_gloves_001',
      retailer: 'Backcountry',
      name: 'Hestra Army Leather Heli Ski Gloves',
      category: 'gloves',
      price: 170,
      size: 'M',
      color: 'brown',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof: true,
        insulation: 'G-Loft',
        temperature_rating: '-30°C'
      },
      delivery_days: 5,
      in_stock: true,
      rating: 4.9
    },
    {
      id: 'bc_helmet_001',
      retailer: 'Backcountry',
      name: 'POC Fornix Helmet',
      category: 'helmet',
      price: 150,
      size: 'M-L',
      color: 'white',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        certification: 'CE EN 1077',
        ventilation: 'adjustable',
        weight: '450g'
      },
      delivery_days: 3,
      in_stock: true,
      rating: 4.5
    }
  ],

  Amazon: [
    {
      id: 'amz_jacket_001',
      retailer: 'Amazon',
      name: 'Columbia Bugaboo II Fleece Interchange Jacket',
      category: 'jacket',
      price: 180,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '10000mm',
        breathability: '10000g',
        insulation: 'fleece liner',
        weight: '900g',
        temperature_range: '-10°C to 5°C'
      },
      delivery_days: 2,
      in_stock: true,
      rating: 4.2
    },
    {
      id: 'amz_jacket_002',
      retailer: 'Amazon',
      name: 'MOERDENG Waterproof Ski Jacket',
      category: 'jacket',
      price: 89,
      size: 'M',
      color: 'red',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '8000mm',
        breathability: '5000g',
        insulation: '60g cotton',
        weight: '850g',
        temperature_range: '-5°C to 5°C'
      },
      delivery_days: 3,
      in_stock: true,
      rating: 4.0
    },
    {
      id: 'amz_pants_001',
      retailer: 'Amazon',
      name: 'TSLA Winter Snow Pants',
      category: 'pants',
      price: 65,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof_rating: '5000mm',
        breathability: '5000g',
        insulation: 'fleece lining',
        ventilation: 'none'
      },
      delivery_days: 2,
      in_stock: true,
      rating: 3.9
    },
    {
      id: 'amz_base_001',
      retailer: 'Amazon',
      name: 'DEVOPS Thermal Base Layer Set',
      category: 'base_layer',
      price: 35,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        material: 'polyester blend',
        weight: '180gsm',
        warmth: 'medium'
      },
      delivery_days: 1,
      in_stock: true,
      rating: 4.1
    },
    {
      id: 'amz_gloves_001',
      retailer: 'Amazon',
      name: 'MCTi Waterproof Ski Gloves',
      category: 'gloves',
      price: 25,
      size: 'M',
      color: 'black',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        waterproof: true,
        insulation: '3M Thinsulate',
        temperature_rating: '-10°C'
      },
      delivery_days: 2,
      in_stock: true,
      rating: 4.3
    },
    {
      id: 'amz_goggles_001',
      retailer: 'Amazon',
      name: 'OutdoorMaster Ski Goggles Pro',
      category: 'goggles',
      price: 45,
      size: 'One Size',
      color: 'gray',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        lens_type: 'VLT coating',
        interchangeable: false,
        anti_fog: true
      },
      delivery_days: 2,
      in_stock: true,
      rating: 4.4
    },
    {
      id: 'amz_socks_001',
      retailer: 'Amazon',
      name: 'Danish Endurance Merino Wool Ski Socks',
      category: 'socks',
      price: 28,
      size: 'M',
      color: 'gray',
      image: 'https://placehold.co/300x300/0EA5E9/FFF?text=Ski+Gear',
      specs: {
        material: '70% merino wool',
        cushioning: 'medium',
        height: 'over-calf'
      },
      delivery_days: 2,
      in_stock: true,
      rating: 4.5
    }
  ]
};

// Helper function to get all products
function getAllProducts() {
  return [
    ...mockProducts.REI,
    ...mockProducts.Backcountry,
    ...mockProducts.Amazon
  ];
}

// Helper function to search products by category
function searchByCategory(category) {
  return getAllProducts().filter(p => p.category === category);
}

// Helper function to search products by multiple filters
function searchProducts(filters = {}) {
  let results = getAllProducts();

  if (filters.category) {
    results = results.filter(p => p.category === filters.category);
  }

  if (filters.size) {
    results = results.filter(p => 
      p.size === filters.size || p.size === 'One Size'
    );
  }

  if (filters.maxPrice) {
    results = results.filter(p => p.price <= filters.maxPrice);
  }

  if (filters.maxDeliveryDays) {
    results = results.filter(p => p.delivery_days <= filters.maxDeliveryDays);
  }

  if (filters.color) {
    results = results.filter(p => 
      p.color.toLowerCase().includes(filters.color.toLowerCase())
    );
  }

  return results;
}

module.exports = {
  mockProducts,
  getAllProducts,
  searchByCategory,
  searchProducts
};