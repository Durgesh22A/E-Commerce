import React, { useState, useMemo, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useDebounce } from "../hooks/useDebounce";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const Products = () => {
  const { products, categories, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Naya State: Pagination ke liye
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Ek page par 12 items

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Jab bhi user search/filter kare, use Page 1 par bhej do
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, sortOrder]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (debouncedSearch) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (sortOrder === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating); // DummyJSON uses 'rating' not 'rating.rate'
    }
    return result;
  }, [products, debouncedSearch, selectedCategory, sortOrder]);

  // Pagination Logic Calculate karna
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Amazing Products... ⏳
      </h2>
    );
  if (error)
    return (
      <h2 style={{ textAlign: "center", color: "#ff4757", marginTop: "50px" }}>
        Error: {error}
      </h2>
    );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Filters Bar */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px",
          flexWrap: "wrap",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            outline: "none",
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            minWidth: "180px",
            textTransform: "capitalize",
            outline: "none",
          }}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            minWidth: "180px",
            outline: "none",
          }}
        >
          <option value="default">Sort By: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated ⭐</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <h3 style={{ textAlign: "center", color: "#888", marginTop: "50px" }}>
          No products match your search 😢
        </h3>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "25px",
            }}
          >
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "40px",
              }}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: currentPage === 1 ? "#e0e0e0" : "#0984e3",
                  color: currentPage === 1 ? "#888" : "white",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                }}
              >
                Prev
              </button>

              <span
                style={{ fontWeight: "bold", fontSize: "18px", color: "#333" }}
              >
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor:
                    currentPage === totalPages ? "#e0e0e0" : "#0984e3",
                  color: currentPage === totalPages ? "#888" : "white",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
