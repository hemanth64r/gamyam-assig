import { useState, useMemo } from 'react';
import './App.css';
import { initialProducts } from './data/products';
import { FaList, FaThLarge } from 'react-icons/fa';
import ProductList from './components/ProductList';
import ProductCards from './components/ProductCards';
import SearchBar from './components/SearchBar';
import useDebounce from './hooks/useDebounce';
import ProductForm from './components/ProductForm';
import Pagination from './components/Pagination';

const ITEMS_PER_PAGE = 6;

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState('list');
  const [searchText, setSearchText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchText, 500);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearchTerm) {
      return products;
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [products, debouncedSearchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts(prev => [...prev, newProduct]);
    setShowForm(false);
  };

  const handleEditProduct = (productData) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === editingProduct.id
          ? { ...productData, id: editingProduct.id }
          : p
      )
    );
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

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
            <button
              className="btn-add-product"
              onClick={() => setShowForm(true)}
            >
              ➕ Add Product
            </button>
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
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No products found matching "{debouncedSearchTerm}"</p>
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <ProductList products={paginatedProducts} onEdit={handleEditClick} />
            ) : (
              <ProductCards products={paginatedProducts} onEdit={handleEditClick} />
            )}
          </>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredProducts.length}
        />
      </main>

      {showForm && (
        <ProductForm
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          onCancel={handleCloseForm}
          initialData={editingProduct}
        />
      )}

    </div>
  );
}

export default App;