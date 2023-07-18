import React, { useState, useEffect } from 'react';

const ProductList = ({ products, handleAgregarAlCarrito, setMostrarCarrito }) => {
  const [expandedDescription, setExpandedDescription] = useState({});

  const handleClick = (productId) => {//Maneja el evento de agregar al carrito
    handleAgregarAlCarrito(productId);
    setMostrarCarrito(true);
  };

  const handleSeeMore = (productId) => {//Expande la descripcion de los prodcutos
    setExpandedDescription((prevState) => ({
      ...prevState,
      [productId]: true
    }));
  };

  const handleSeeLess = (productId) => {//Contrae la descripcion del producto
    setExpandedDescription((prevState) => ({
      ...prevState,
      [productId]: false
    }));
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <h3>{product.title}</h3>
          <div className="product-image-container">
            <img src={product.image} alt={product.title} className="product-image" />
          </div>
          <p className="product-price">Precio: {product.price}</p>
          <p className="product-description">
            {expandedDescription[product.id]
              ? product.description
              : `${product.description.slice(0, 100)}...`}
          </p>
          {!expandedDescription[product.id] && (
            <button className="btn-see-more" onClick={() => handleSeeMore(product.id)}>
              Ver más
            </button>
          )}
          {expandedDescription[product.id] && (
            <button className="btn-see-less" onClick={() => handleSeeLess(product.id)}>
              Ver menos
            </button>
          )}
          <div className="add-to-cart-container">
            <button className="btn-add-to-cart" onClick={() => handleClick(product.id)}>
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
