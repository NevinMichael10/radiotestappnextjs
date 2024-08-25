"use client";
import React from "react";
import { useCartStore } from "@/store/useCartStore";

const Cart: React.FC = () => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart mt-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Cart Items
      </h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No items in cart</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-2 dark:bg-gray-700 dark:border-gray-600"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-500"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {item.name} (x{item.quantity})
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.price * item.quantity} Rs
                  </p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Total: {totalPrice} Rs
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
