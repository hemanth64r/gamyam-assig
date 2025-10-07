import React, { useState } from 'react';
import './App.css';
import { initialProducts } from './data/products';
import ProductList from './components/ProductList';
import ProductCards from './components/ProductCards';
import { FaList, FaThLarge } from 'react-icons/fa';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState('list');

  return (
    <div className="App">
      <header className="app-header">
        <h1>Product Management System</h1>
      </header>
      <main className="app-main">
        <div className="controls-section">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FaList size={18} style={{ marginRight: '6px' }} /> List View
            </button>
            <button
              className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              <FaThLarge size={18} style={{ marginRight: '6px' }} /> Card View
            </button>
          </div>

        </div>

        {viewMode === 'list' ? (
          <ProductList products={products} />
        ) : (
          <ProductCards products={products} />
        )}
      </main>
    </div>
  );
}

export default App;