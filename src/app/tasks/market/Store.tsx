"use client";
import type React from "react";
import { useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiX,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

// Product data
const products: Product[] = [
  {
    id: 1,
    name: "Oak Coffee Table",
    price: 299,
    description: "Handcrafted solid oak coffee table with a natural finish",
    image:
      "https://images.unsplash.com/photo-1692262089751-7e26b69ad8d1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Tables",
    quantity: 5,
  },
  {
    id: 2,
    name: "Walnut Dining Chair",
    price: 189,
    description: "Beautiful walnut dining chair with hand-woven seat",
    image:
      "https://plus.unsplash.com/premium_photo-1705479742794-5cd85f349bd5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Chairs",
    quantity: 8,
  },
  {
    id: 3,
    name: "Pine Bookshelf",
    price: 459,
    description: "Tall pine bookshelf with five adjustable shelves",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=60",
    category: "Shelves",
    quantity: 3,
  },
  {
    id: 4,
    name: "Cherry Wood Desk",
    price: 599,
    description: "Handcrafted cherry wood desk with spacious surface area",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=60",
    category: "Desks",
    quantity: 4,
  },
  {
    id: 5,
    name: "Reclaimed Wood Stool",
    price: 129,
    description: "Unique reclaimed wood stool with natural imperfections",
    image:
      "https://images.unsplash.com/photo-1719899779266-ae9427607bf1?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Stools",
    quantity: 7,
  },
  {
    id: 6,
    name: "Maple Bed Frame",
    price: 899,
    description: "Solid maple bed frame with hidden hardware",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&auto=format&fit=crop&q=60",
    category: "Beds",
    quantity: 2,
  },
];

// ProductCard Component
const ProductCard = ({
  product,
  onAddToCart,
  onProductClick,
  cartItem,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  cartItem?: CartItem;
}) => {
  const isMaxQuantity = cartItem?.quantity === product.quantity;

  return (
    <div
      onClick={() => onProductClick(product)}
      className="group bg-[#D4C5A4] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {cartItem?.quantity && (
          <div className="absolute top-3 right-3 bg-[#8B4513] text-white px-2 py-1 rounded-full text-sm font-medium shadow-md">
            {cartItem.quantity} in cart
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B2F2F]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={isMaxQuantity}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
              isMaxQuantity
                ? "bg-[#3B2F2F]/50 text-white/70 cursor-not-allowed"
                : "bg-[#8B4513] text-white hover:bg-[#6B3410]"
            }`}
            title={isMaxQuantity ? "Maximum quantity reached" : "Add to cart"}
          >
            <FiShoppingCart size={18} />
            {isMaxQuantity ? "Max Quantity" : "Add to Cart"}
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#3B2F2F] group-hover:text-[#8B4513] transition-colors">
          {product.name}
        </h3>
        <p className="text-lg font-medium text-[#8B4513] mt-2">
          ${product.price}
        </p>
        <p className="text-sm text-[#3B2F2F]/70 mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm text-[#3B2F2F]/60">
          <span>{product.category}</span>
          <span>Qty: {product.quantity}</span>
        </div>
      </div>
    </div>
  );
};

// ProductModal Component
const ProductModal = ({
  product,
  onClose,
  onAddToCart,
  cartItem,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  cartItem?: CartItem;
}) => {
  const isMaxQuantity = cartItem?.quantity === product.quantity;

  return (
    <div className="fixed inset-0 bg-[#3B2F2F]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#F8F4EA] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-scale-in">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>
        <div className="md:w-1/2 p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-semibold text-[#3B2F2F]">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              className="text-[#3B2F2F] hover:text-[#8B4513] transition-colors bg-[#D4C5A4] p-2 rounded-full hover:bg-[#C5B089]"
            >
              <FiX size={24} />
            </button>
          </div>
          <p className="text-2xl font-medium text-[#8B4513] mb-6">
            ${product.price}
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#3B2F2F] mb-2">
              Description
            </h3>
            <p className="text-[#3B2F2F]/80 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#3B2F2F] mb-2">
              Details
            </h3>
            <ul className="space-y-2 text-[#3B2F2F]/80">
              <li>
                <span className="font-medium">Category:</span>{" "}
                {product.category}
              </li>
              <li>
                <span className="font-medium">Quantity Available:</span>{" "}
                {product.quantity}
              </li>
            </ul>
          </div>
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              disabled={isMaxQuantity}
              className={`flex-1 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                isMaxQuantity
                  ? "bg-[#3B2F2F]/50 text-white/70 cursor-not-allowed"
                  : "bg-[#8B4513] text-white hover:bg-[#6B3410]"
              }`}
              title={isMaxQuantity ? "Maximum quantity reached" : "Add to cart"}
            >
              <FiShoppingCart size={18} />
              {isMaxQuantity ? "Max Quantity Reached" : "Add to Cart"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-[#8B4513] text-[#8B4513] py-3 rounded-lg hover:bg-[#8B4513]/10 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// CartSidebar Component
const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div
        style={{ zIndex: 1000 }}
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-[#F8F4EA] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } animate-slide-in`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center border-b border-[#D4C5A4] pb-4">
            <h2 className="text-2xl font-semibold text-[#3B2F2F]">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-[#3B2F2F] hover:text-[#8B4513] transition-colors bg-[#D4C5A4] p-2 rounded-full hover:bg-[#C5B089]"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mt-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="w-24 h-24 mb-6 opacity-20">
                  <FiShoppingCart size={96} className="text-[#8B4513]" />
                </div>
                <p className="text-lg text-[#3B2F2F]/70 mb-2">
                  Your cart is empty
                </p>
                <p className="text-sm text-[#3B2F2F]/50">
                  Add some handcrafted furniture to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4 border-b border-[#D4C5A4] pb-4"
                  >
                    <div className="w-20 h-20 bg-[#D4C5A4] rounded-lg overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#3B2F2F]">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-[#8B4513]">
                          ${item.product.price}
                        </span>
                        <span className="text-sm text-[#3B2F2F]/60">×</span>
                        <input
                          type="number"
                          min="1"
                          max={item.product.quantity}
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            onUpdateQuantity(item.product.id, value);
                          }}
                          className="w-16 p-1 text-sm bg-[#F8F4EA] text-[#3B2F2F] border border-[#3B2F2F]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
                        />
                        <span className="text-xs text-[#3B2F2F]/60">
                          (max: {item.product.quantity})
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="bg-red-600 text-sm text-white hover:bg-red-700 transition-colors mt-2 px-2 py-1 rounded-md cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-[#D4C5A4] pt-6 mt-6">
            <div className="flex justify-between mb-6">
              <span className="text-lg font-medium text-[#3B2F2F]">Total:</span>
              <span className="text-xl font-semibold text-[#8B4513]">
                ${totalPrice}
              </span>
            </div>
            <button
              className="w-full bg-[#8B4513] text-white py-3 rounded-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Filters Component
const Filters = ({
  searchTerm,
  category,
  minPrice,
  maxPrice,
  quantity,
  onSearchChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onQuantityChange,
  onReset,
}: {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  quantity: number;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onQuantityChange: (value: number) => void;
  onReset: () => void;
}) => {
  return (
    <div className="bg-[#D4C5A4] rounded-2xl p-6 shadow-lg h-min">
      <h2 className="text-xl font-semibold mb-6 text-[#3B2F2F] border-b border-[#3B2F2F]/20 pb-3">
        Filters
      </h2>
      <div className="space-y-6">
        <div className="mb-6">
          <div className="relative mb-6">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3B2F2F]/50"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full p-2 pl-10 bg-[#F8F4EA] text-[#3B2F2F] border border-[#3B2F2F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-[#3B2F2F] mb-3">Category</h3>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2 bg-[#F8F4EA] text-[#3B2F2F] border border-[#3B2F2F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
          >
            {[
              "All",
              "Tables",
              "Chairs",
              "Shelves",
              "Desks",
              "Stools",
              "Beds",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-[#3B2F2F] mb-3">
            Price Range
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#3B2F2F]/70 mb-1 block">
                Min Price ($)
              </label>
              <input
                type="number"
                min="0"
                max={maxPrice}
                value={minPrice}
                onChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value) || 0);
                  onMinPriceChange(Math.min(value, maxPrice));
                }}
                className="w-full p-2 bg-[#F8F4EA] text-[#3B2F2F] border border-[#3B2F2F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-[#3B2F2F]/70 mb-1 block">
                Max Price ($)
              </label>
              <input
                type="number"
                min={minPrice}
                max="1000"
                value={maxPrice}
                onChange={(e) => {
                  const value = Math.min(1000, parseInt(e.target.value) || 0);
                  onMaxPriceChange(Math.max(value, minPrice));
                }}
                className="w-full p-2 bg-[#F8F4EA] text-[#3B2F2F] border border-[#3B2F2F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-[#3B2F2F] mb-3">
            Minimum Quantity
          </h3>
          <input
            type="number"
            min="0"
            max="10"
            value={quantity}
            onChange={(e) => {
              const value = Math.max(0, parseInt(e.target.value) || 0);
              onQuantityChange(Math.min(value, 10));
            }}
            className="w-full p-2 bg-[#F8F4EA] text-[#3B2F2F] border border-[#3B2F2F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]/50 transition-all"
            placeholder="Any quantity"
          />
        </div>

        <button
          onClick={onReset}
          className="w-full mt-8 bg-[#8B4513] text-white py-2 rounded-lg hover:bg-[#6B3410] transition-colors flex items-center justify-center gap-2"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#3B2F2F] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Artisan Furniture Co.</h3>
            <p className="text-[#D4C5A4]">
              Crafting timeless pieces that bring warmth and character to your
              home.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#D4C5A4] hover:text-white transition-colors"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-[#D4C5A4] hover:text-white transition-colors"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-[#D4C5A4] hover:text-white transition-colors"
              >
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#D4C5A4] hover:text-white transition-colors"
                >
                  Shop All
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#D4C5A4] hover:text-white transition-colors"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#D4C5A4] hover:text-white transition-colors"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#D4C5A4] hover:text-white transition-colors"
                >
                  Custom Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[#D4C5A4] hover:text-white transition-colors"
                >
                  Tables
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#D4C5A4] hover:text-white transition-colors"
                >
                  Chairs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#D4C5A4] hover:text-white transition-colors"
                >
                  Shelves
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#D4C5A4] hover:text-white transition-colors"
                >
                  Desks
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-[#D4C5A4]">
                <FiMapPin className="flex-shrink-0" />
                <span>123 Artisan Street, Woodville, CA 90210</span>
              </li>
              <li className="flex items-center space-x-3 text-[#D4C5A4]">
                <FiPhone className="flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-[#D4C5A4]">
                <FiMail className="flex-shrink-0" />
                <span>hello@artisanfurniture.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D4C5A4]/20 mt-12 pt-8 text-center text-[#D4C5A4]">
          <p>
            &copy; {new Date().getFullYear()} Artisan Furniture Co. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Navigation Bar Component
const NavigationBar = ({
  cartItems,
  onCartClick,
}: {
  cartItems: number;
  onCartClick: () => void;
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#3B2F2F] text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">
            Artisan Furniture Co.
          </h1>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-[#D4C5A4] transition-colors">
              Shop
            </a>
            <a href="#" className="hover:text-[#D4C5A4] transition-colors">
              Collections
            </a>
            <a href="#" className="hover:text-[#D4C5A4] transition-colors">
              About
            </a>
            <a href="#" className="hover:text-[#D4C5A4] transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={onCartClick}
            className="relative text-white hover:text-[#D4C5A4] transition-colors"
          >
            <FiShoppingCart size={28} />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4C5A4] text-[#3B2F2F] text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {cartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="relative bg-[#3B2F2F] text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&auto=format&fit=crop&q=80"
          alt="Luxury furniture showcase"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3B2F2F] to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Crafting Timeless Elegance
          </h2>
          <p className="text-lg md:text-xl text-[#D4C5A4] mb-8">
            Discover our handcrafted collection of premium furniture, where
            traditional craftsmanship meets modern design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#8B4513] text-white px-8 py-3 rounded-lg hover:bg-[#6B3410] transition-colors">
              Shop Collection
            </button>
            <button className="border-2 border-[#D4C5A4] text-[#D4C5A4] px-8 py-3 rounded-lg hover:bg-[#D4C5A4] hover:text-[#3B2F2F] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main ShopPage Component
export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<number>(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    if (cartItem && cartItem.quantity >= product.quantity) {
      toast.error("Maximum quantity reached for this item");
      return; // Max quantity reached
    }

    setCartItems((prev) => prev + 1);
    if (cartItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success(`Added another ${product.name} to cart`);
    } else {
      setCart((prev) => [...prev, { product, quantity: 1 }]);
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const handleUpdateCartQuantity = (productId: number, newQuantity: number) => {
    const item = cart.find((item) => item.product.id === productId);
    if (!item) return;

    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    if (newQuantity > item.product.quantity) {
      toast.error("Cannot order more than available quantity");
      return; // Don't allow ordering more than available
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    const oldQuantity = item.quantity;
    setCartItems((prev) => prev - oldQuantity + newQuantity);
    toast.success(`Updated quantity of ${item.product.name}`);
  };

  const handleRemoveFromCart = (productId: number) => {
    const existingItem = cart.find((item) => item.product.id === productId);
    const existingItemQuantity = existingItem?.quantity ?? 0;
    setCartItems((prev) => prev - existingItemQuantity);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (existingItem) {
      toast.success(`Removed ${existingItem.product.name} from cart`);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategory("All");
    setMinPrice(0);
    setMaxPrice(1000);
    setQuantity(0);
  };

  const filteredProducts = products.filter((product) => {
    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (category !== "All" && product.category !== category) return false;
    if (minPrice > 0 || maxPrice < 1000) {
      if (product.price < minPrice || product.price > maxPrice) return false;
    }
    if (quantity > 0) {
      if (product.quantity < quantity) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F4EA] text-[#3B2F2F] font-['Outfit']">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap");

        body {
          font-family: "Outfit", sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(139, 69, 19, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(139, 69, 19, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(139, 69, 19, 0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#F8F4EA",
            color: "#3B2F2F",
            borderRadius: "8px",
            padding: "12px 16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #D4C5A4",
            marginBottom: "20px",
          },
          success: {
            iconTheme: {
              primary: "#8B4513",
              secondary: "#F8F4EA",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#F8F4EA",
            },
          },
        }}
        containerStyle={{
          bottom: 20,
        }}
        gutter={8}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          cartItem={cart.find((item) => item.product.id === selectedProduct.id)}
        />
      )}

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <NavigationBar
        cartItems={cartItems}
        onCartClick={() => setCartOpen(true)}
      />
      <HeroSection />

      <div className="max-w-7xl mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <Filters
            searchTerm={searchTerm}
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            quantity={quantity}
            onSearchChange={setSearchTerm}
            onCategoryChange={setCategory}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onQuantityChange={setQuantity}
            onReset={handleResetFilters}
          />

          <div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#D4C5A4] rounded-2xl shadow-lg">
                <p className="text-xl font-medium text-[#3B2F2F]">
                  No products found matching your criteria
                </p>
                <p className="text-[#3B2F2F]/70 mt-2">
                  Try adjusting your filters or search term
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onProductClick={setSelectedProduct}
                    cartItem={cart.find(
                      (item) => item.product.id === product.id
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
