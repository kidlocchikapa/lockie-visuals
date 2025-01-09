import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Eye,
  Edit,
  

  
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [userProducts, setUserProducts] = useState([
    {
      id: 1,
      name: 'Premium WordPress Theme',
      price: '$59',
      image: 'https://via.placeholder.com/300x200',
      status: 'Live',
      sales: 45,
      views: 1200,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'UI Kit Bundle',
      price: '$89',
      image: 'https://via.placeholder.com/300x200',
      status: 'Live',
      sales: 28,
      views: 850,
      rating: 4.6,
    },
  ]);

  const handleDeleteProduct = (productId) => {
    setUserProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const AddProductForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">Add a New Product</h3>
      <form>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowAddProduct(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.status === 'Live'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {product.status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <span className="text-blue-600 text-lg font-bold">
            {product.price}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-500 text-sm">
            <p>Sales: {product.sales}</p>
            <p>Views: {product.views}</p>
            <p>Rating: {product.rating}</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
              <Eye className="h-4 w-4" />
            </button>
            <button
              className="p-2 hover:bg-red-100 rounded-lg text-red-500"
              title="Delete"
              onClick={() => handleDeleteProduct(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="border-b pb-4">
        {['products', 'services', 'analytics'].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-4 ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <div className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Products</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowAddProduct(true)}
            >
              <Plus className="h-5 w-5" />
              Add Product
            </button>
          </div>

          {showAddProduct && <AddProductForm />}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;




