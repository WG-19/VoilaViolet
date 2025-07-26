// src/data/products.js

export const products = {
  straight: [
    {
      id: 'straight-1',
      name: 'Silky Straight Bundle',
      color: '1B',
      image: '/images/Straight.jpeg',
      description: 'Premium 100% human straight hair bundle. Prices are per bundle in USD.',
      variants: [
        { length: '10"', price: 20 },
        { length: '12"', price: 25 },
        { length: '14"', price: 30 },
        { length: '16"', price: 35 },
        { length: '18"', price: 40 },
        { length: '20"', price: 45 },
      ]
    },
    // Add more straight products as needed
  ],
  waterwave: [
    {
      id: 'waterwave-1',
      name: 'Luxury Waterwave Bundle',
      color: '1B',
      image: '/images/Waterwave (1).jpeg',
      description: 'Premium 100% human waterwave hair bundle. Prices are per bundle in USD.',
      variants: [
        { length: '10"', price: 25 },
        { length: '12"', price: 30 },
        { length: '14"', price: 35 },
        { length: '16"', price: 40 },
        { length: '18"', price: 45 },
        { length: '20"', price: 50 },
      ]
    },
    // Add more waterwave products as needed
  ]
};

export default products;
