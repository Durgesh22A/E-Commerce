import React from "react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "white" }}>
        <h2>Your Wishlist is Empty ❤️</h2>
        <p style={{ color: "#888", marginBottom: "20px" }}>
          Save items you love to view them later.
        </p>
        <Link
          to="/products"
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4757",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h2
        style={{
          color: "white",
          marginBottom: "30px",
          borderBottom: "1px solid #333",
          paddingBottom: "10px",
        }}
      >
        My Wishlist ({wishlistItems.length})
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "25px",
        }}
      >
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
