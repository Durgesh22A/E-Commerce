import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById, fetchProductsByCategory } from "../services/api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import ProductCard from "../components/ProductCard"; // Related products ke liye

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Page top par scroll karne ke liye
    window.scrollTo(0, 0);

    const getProductData = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);

        const related = await fetchProductsByCategory(data.category);
        const filteredRelated = related
          .filter((item) => item.id !== data.id)
          .slice(0, 4);
        setRelatedProducts(filteredRelated);
      } catch (error) {
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [id]);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Details...
      </h2>
    );
  if (!product)
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        color: "#333",
      }}
    >
      <Link
        to="/products"
        style={{
          color: "#0984e3",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        <FaArrowLeft /> Back to Shop
      </Link>

      {/* Main Product Info */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f8f9fa",
            borderRadius: "10px",
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              color: "#888",
              letterSpacing: "1px",
              fontWeight: "bold",
            }}
          >
            {product.brand || product.category}
          </p>
          <h1 style={{ fontSize: "32px", margin: 0, color: "#2d3436" }}>
            {product.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span
              style={{ fontSize: "36px", fontWeight: "900", color: "#0984e3" }}
            >
              ${product.price}
            </span>
            <span
              style={{
                backgroundColor: "#ff4757",
                color: "white",
                padding: "5px 10px",
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {product.discountPercentage}% OFF
            </span>
            <span
              style={{
                backgroundColor: "#fff3cd",
                color: "#856404",
                padding: "5px 10px",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              ⭐ {product.rating}
            </span>
          </div>

          <p style={{ color: "#e15f41", fontWeight: "bold" }}>
            Hurry! Only {product.stock} items left in stock.
          </p>

          <p
            style={{
              lineHeight: "1.6",
              color: "#636e72",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            {product.description}
          </p>

          <button
            onClick={() => {
              addToCart(product);
              toast.success("Added to Cart!", { theme: "light" });
            }}
            style={{
              marginTop: "auto",
              padding: "15px",
              backgroundColor: "#0984e3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              transition: "0.3s",
            }}
          >
            <FaShoppingCart /> Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: "60px" }}>
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "20px",
              color: "#2d3436",
              borderBottom: "2px solid #eee",
              paddingBottom: "10px",
            }}
          >
            You might also like
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "25px",
            }}
          >
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
