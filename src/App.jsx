import React, { useState, useEffect } from 'react';
import ProductList from './ProductList.jsx';
import Cart from './Cart.jsx';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => { //Solicita los productos de la API
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  const handleAgregarAlCarrito = (productId) => {
    const existeItem = cartItems.find((item) => item.id === productId);

    if (existeItem) {//Incrementa la cantidad si el producto ya esta en el carrito
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      console.log('El producto ya está en el carrito. Se ha incrementado la cantidad.');
    } else { //Agrega un nuevo producto al carrito
      const product = products.find((product) => product.id === productId);
      console.log(`Se ha agregado un nuevo producto al carrito de compras: ${product.title}`);
      setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
    }

    setMostrarCarrito(true);
  };

  const handleQuitar = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      console.log(`Se ha quitado un producto del carrito de compras: ${item.title}, quedan ${item.quantity - 1} en el carrito`);
    } else if (item && item.quantity === 1) {
      const updatedCartItems = cartItems.filter((item) => item.id !== productId);
      console.log(`Se ha quitado un producto del carrito de compras: ${item.title}`);
      setCartItems(updatedCartItems);
      if (updatedCartItems.length === 0) {
        setMostrarCarrito(false);
      }
    }
  };

  return (
    <div className="body-container">
      <h1>FakeStoreApi</h1>
      <h3><span>Tienda de productos increibles</span></h3>
      <ProductList products={products} handleAgregarAlCarrito={handleAgregarAlCarrito} mostrarCarrito={mostrarCarrito} setMostrarCarrito={setMostrarCarrito} />
      {mostrarCarrito && (
        <div>
          <h2><span>Carrito de compras</span></h2>
          <Cart cartItems={cartItems} handleQuitar={handleQuitar} />
        </div>
      )}
    </div>
  );
};

export default App;


