import React, { useEffect, useRef } from 'react';

const Cart = ({ cartItems, handleQuitar }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity || 0), 0
  );

  const quitarProdcutoButtonsRef = useRef([]);

  useEffect(() => {
    const buttons = quitarProdcutoButtonsRef.current;

    buttons.forEach((button) => {
      const productId = button.dataset.productId;
      button.addEventListener('click', () => handleQuitar(productId));

      return () => {
        button.removeEventListener('click', () => handleQuitar(productId));
      };
    });
  }, [handleQuitar]);

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={`cartItem-${index}`}>
              <h4>{item.title}</h4>
              <p>Precio: {item.price}</p>
              <p>Cantidad de productos en el carrito: {item.quantity}</p>
              <button 
              ref={(button) => {
                if (button) {
                  quitarProdcutoButtonsRef.current.push(button);
                }
              }}
              data-product-id={item.id}
              className="btn-quitar" onClick={() => handleQuitar(item.id)}
              >
                Quitar producto 
              </button>
            </div>
          ))}
          <h4 className="cart-total-price">Valor total: ${totalPrice.toFixed(2)}</h4>
        </div>
    )}
    </div>
  );
};

export default Cart;
