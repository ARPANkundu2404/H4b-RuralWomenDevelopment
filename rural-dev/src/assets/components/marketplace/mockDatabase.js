// mockDatabase.js
let _productDatabase = [
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    seller: "Priya Sharma",
    sellerEmail: "priya@example.com",
    price: 12.99,
    category: "Home Decor",
    description: "Beautiful hand-painted ceramic mug, food-safe glaze",
    image: "image.png",
    approved: true,
    featured: false,
  },
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    seller: "Priya Sharma",
    sellerEmail: "priya@example.com",
    price: 12.99,
    category: "Home Decor",
    description: "Beautiful hand-painted ceramic mug, food-safe glaze",
    image: "image.png",
    approved: true,
    featured: false,
  },
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    seller: "Priya Sharma",
    sellerEmail: "priya@example.com",
    price: 12.99,
    category: "Home Decor",
    description: "Beautiful hand-painted ceramic mug, food-safe glaze",
    image: "image.png",
    approved: true,
    featured: false,
  },
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    seller: "Priya Sharma",
    sellerEmail: "priya@example.com",
    price: 12.99,
    category: "Home Decor",
    description: "Beautiful hand-painted ceramic mug, food-safe glaze",
    image: "image.png",
    approved: true,
    featured: false,
  },
  // ... other products
];

let _transactionLog = [];

export const getProducts = () => [..._productDatabase];
export const getTransactions = () => [..._transactionLog];

export const addProduct = (product) => {
  _productDatabase.push(product);
};

export const updateProduct = (productId, updates) => {
  const index = _productDatabase.findIndex((p) => p.id === productId);
  if (index !== -1) {
    _productDatabase[index] = { ..._productDatabase[index], ...updates };
  }
};

export const removeProduct = (productId) => {
  _productDatabase = _productDatabase.filter((p) => p.id !== productId);
};

export const addTransaction = (transaction) => {
  _transactionLog.push(transaction);
};

export const sendEmail = (to, subject, body) => {
  console.log(`Email sent to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
};