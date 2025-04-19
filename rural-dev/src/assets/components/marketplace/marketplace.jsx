import React, { useState, useEffect } from 'react';

import { 
  getProducts, 
  getTransactions, 
  addProduct, 
  addTransaction,
  sendEmail 
} from './mockDatabase';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [view, setView] = useState('marketplace');
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    seller: 'Current User',
    sellerEmail: 'user@example.com'
  });
  const [purchaseInfo, setPurchaseInfo] = useState({
    name: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    setProducts(getProducts());
    setTransactions(getTransactions());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handlePurchaseInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      image: newProduct.image || 'https://via.placeholder.com/300x300?text=Product+Image',
      approved: false,
      featured: false
    };
    
    addProduct(product);
    setProducts(getProducts());
    
    setNewProduct({
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      seller: 'Current User',
      sellerEmail: 'user@example.com'
    });
    
    sendEmail(
      'admin@marketplace.com',
      'New Product Submission',
      `A new product "${product.name}" has been submitted for approval.`
    );
    
    alert('Your product has been submitted for approval!');
    setView('marketplace');
  };

  const handlePurchase = (product) => {
    if (!purchaseInfo.name || !purchaseInfo.email) {
      alert('Please fill in your contact information');
      return;
    }

    const transaction = {
      id: Math.max(...transactions.map(t => t.id), 0) + 1,
      productId: product.id,
      productName: product.name,
      buyer: purchaseInfo.name,
      buyerEmail: purchaseInfo.email,
      buyerAddress: purchaseInfo.address,
      seller: product.seller,
      sellerEmail: product.sellerEmail,
      price: product.price,
      date: new Date().toISOString()
    };
    
    addTransaction(transaction);
    setTransactions(getTransactions());
    
    sendEmail(
      purchaseInfo.email,
      `Your purchase of ${product.name}`,
      `Thank you for purchasing ${product.name} for $${product.price}!\n\n` +
      `Seller: ${product.seller}\n` +
      `We'll notify you when your item ships.`
    );
    
    sendEmail(
      product.sellerEmail,
      `New sale: ${product.name}`,
      `Congratulations! Your ${product.name} has been sold for $${product.price}.\n\n` +
      `Buyer: ${purchaseInfo.name}\n` +
      `Email: ${purchaseInfo.email}\n` +
      `Shipping address: ${purchaseInfo.address || 'Digital product'}`
    );
    
    alert(`Thank you for purchasing ${product.name}! A confirmation has been sent to your email.`);
    setShowProductModal(false);
    setPurchaseInfo({ name: '', email: '', address: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {view === 'marketplace' ? (
          <>
            <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-8 mb-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">Empowering Women Entrepreneurs</h2>
                <p className="text-lg mb-6">
                  Discover unique handmade products and support women-owned businesses
                </p>
                <button 
                  onClick={() => setView('sell')}
                  className="bg-white text-blue-700 px-6 py-2 rounded-lg font-medium"
                >
                  Sell Your Products
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.filter(p => p.approved).map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.featured && (
                      <span className="absolute top-2 left-2 bg-blue-400 text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">by {product.seller}</p>
                    <p className="text-blue-700 font-bold mb-3">${product.price.toFixed(2)}</p>
                    <button 
                      onClick={() => {
                        setCurrentProduct(product);
                        setShowProductModal(true);
                      }}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Sell Your Product</h2>
            <form onSubmit={handleSubmitProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Product Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Price ($)*
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="category">
                  Category*
                </label>
                <select
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Art">Art</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="image">
                  Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-md">
                <h4 className="font-bold text-blue-800 mb-2">Seller Information</h4>
                <p className="text-sm text-blue-700">
                  Your products will be listed under: <strong>{newProduct.seller}</strong><br />
                  Contact email: <strong>{newProduct.sellerEmail}</strong>
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Note: All products require admin approval before appearing in the marketplace.
                </p>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setView('marketplace')}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Product
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {showProductModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name}
                className="w-full h-64 object-cover"
              />
              <button 
                onClick={() => setShowProductModal(false)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{currentProduct.name}</h2>
                  <p className="text-blue-700 font-bold text-lg">${currentProduct.price.toFixed(2)}</p>
                </div>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                  {currentProduct.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-2">Sold by: {currentProduct.seller}</p>
              <p className="mb-6">{currentProduct.description}</p>
              
              <div className="space-y-4">
                <h3 className="font-bold">Purchase Information</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name*"
                  value={purchaseInfo.name}
                  onChange={handlePurchaseInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={purchaseInfo.email}
                  onChange={handlePurchaseInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <textarea
                  name="address"
                  placeholder="Shipping Address (if physical product)"
                  value={purchaseInfo.address}
                  onChange={handlePurchaseInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={() => handlePurchase(currentProduct)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg flex-grow hover:bg-blue-700"
                  disabled={!purchaseInfo.name || !purchaseInfo.email}
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;