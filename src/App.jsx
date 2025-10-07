import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import { initialProducts } from './data/products';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Product Management System</h1>
      </header>
      <main>
        <ProductList products={initialProducts}/>
      </main>
    </div>
  );
}

export default App;