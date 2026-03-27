import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion"; // Animation ke liye

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title.slice(0, 15)}... added to cart!`, {
      theme: "light",
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        color: "#333",
        position: "relative",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Discount Badge */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          backgroundColor: "#ff4757",
          color: "white",
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "bold",
          zIndex: 10,
        }}
      >
        {product.discountPercentage}% OFF
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          color: inWishlist ? "#ff4757" : "#aaa",
          zIndex: 10,
          padding: "8px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {inWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Product Image */}
      <div
        style={{
          height: "220px",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          style={{
            color: "#636e72",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "5px",
          }}
        >
          {product.brand || product.category}
        </p>

        <h3
          style={{
            fontSize: "18px",
            margin: "0 0 10px 0",
            height: "50px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "#2d3436",
          }}
        >
          {product.title}
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <span
              style={{ fontWeight: "800", fontSize: "22px", color: "#0984e3" }}
            >
              ${product.price}
            </span>
            <span
              style={{
                textDecoration: "line-through",
                color: "#b2bec3",
                fontSize: "14px",
                marginLeft: "8px",
              }}
            >
              $
              {(
                (product.price * 100) /
                (100 - product.discountPercentage)
              ).toFixed(2)}
            </span>
          </div>
          <span
            style={{
              backgroundColor: "#fff3cd",
              color: "#856404",
              padding: "4px 8px",
              borderRadius: "5px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            ⭐ {product.rating}
          </span>
        </div>

        <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
          <Link
            to={`/products/${product.id}`}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "12px",
              backgroundColor: "#dfe6e9",
              color: "#2d3436",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            View Details
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#0984e3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaShoppingCart /> Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
