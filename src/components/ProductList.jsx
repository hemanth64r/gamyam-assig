import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onEdit }) => {
    return (
        <div className="product-list-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>{product.description}</td>
                            <td>
                                <button className="btn-edit" onClick={()=>onEdit(product)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;