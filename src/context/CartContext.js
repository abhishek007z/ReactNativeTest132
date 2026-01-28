import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 👉 single source of truth
  const getKey = (item) => item.__cartId;

  const addToCart = (product) => {
    const productId =
      product._id || product.id || product.sku || product.title;

    if (!productId) return;

    setCart((prev) => {
      const exists = prev.find((i) => i.__cartId === productId);

      if (exists) {
        return prev.map((i) =>
          i.__cartId === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          ...product,
          __cartId: productId,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQty = (key) => {
    setCart((prev) =>
      prev.map((i) =>
        i.__cartId === key ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQty = (key) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.__cartId === key ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((i) => i.__cartId !== key));
  };

  const totalPrice = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
