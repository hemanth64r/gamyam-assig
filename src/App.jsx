import { useState, useMemo } from 'react';
import './App.css';
import { initialProducts } from './data/products';
import ProductList from './components/ProductList';
import ProductCards from './components/ProductCards';
import SearchBar from './components/SearchBar';
import useDebounce from './hooks/useDebounce';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState('list');
  const [searchText, setSearchText] = useState('');
  
  const debouncedSearchTerm = useDebounce(searchText, 500);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm) {
      return products;
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [products, debouncedSearchTerm]);



  return (
    <div className="App">
      <header className="app-header">
        <h1>Product Management System</h1>
      </header>
      <main className="app-main">
        <div className="controls-section">
          <SearchBar 
            searchText={searchText} 
            onChange={setSearchText}
          />
          <div className="right-controls">
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                📋 List View
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
              >
                🎴 Card View
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found matching "{debouncedSearchTerm}"</p>
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <ProductList products={filteredProducts} />
            ) : (
              <ProductCards products={filteredProducts} />
            )}
          </>
        )}
      </main>

    </div>
  );
}

export default App;