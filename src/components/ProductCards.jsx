import './ProductCards.css';

const ProductCards =({ products, onEdit }) =>{
  return (
    <div className="product-cards-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="card-header">
            <h3 className="product-name">{product.name}</h3>
            <span className="product-category">{product.category}</span>
          </div>
          <div className="card-body">
            <div className="product-price">${product.price.toFixed(2)}</div>
            <div className="product-stock">
              Stock: <span>{product.stock}</span>
            </div>
            <p className="product-description">{product.description}</p>
          </div>
          <div className="card-footer">
            <button className="btn-edit-card" onClick={()=>onEdit(product)}>Edit Product</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCards;