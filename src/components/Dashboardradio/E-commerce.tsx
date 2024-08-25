"use client";
import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const ECommerce: React.FC = () => {
  const { data: session } = useSession();
  console.log("Token", session?.idToken);
  console.log("session", session);

  const channels: CartItem[] = [
    { id: "1", name: "Red FM", price: 5500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVG03ZAstX7L2G5gR3ZVLwU96nZNxWQ0-j7fJ2rpG3sfPCKVGGlqnSk6l_UHbz6XS3S18&usqp=CAU", quantity: 1 },
    { id: "2", name: "Radio Mango", price: 4000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOtXnmD4qeDD3f1R5rZ0U26im37Puc5wLV-Q&s", quantity: 1 },
    { id: "3", name: "Club FM", price: 7500, image: "https://exchange4media.gumlet.io/news-photo/110412-clubfmlede.jpg", quantity: 1 },
    { id: "4", name: "Big FM", price: 2500, image: "https://upload.wikimedia.org/wikipedia/commons/7/74/BIGFM_NEW_LOGO_2019.png", quantity: 1 },
  ];

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);
  const totalCount = useCartStore((state) => state.getTotalCount()); // Get total count including quantities
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleAddToCart = (channel: CartItem) => {
    addToCart({ ...channel, quantity: 1 });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="relative overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={channel.image}
              alt={channel.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {channel.name}
              </h3>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Rs {channel.price}
              </p>
              <button
                className="mt-4 w-full py-2 px-4 bg-graydark text-white font-semibold rounded-lg hover:bg-black transition-colors duration-300"
                onClick={() => handleAddToCart(channel)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ECommerce;
