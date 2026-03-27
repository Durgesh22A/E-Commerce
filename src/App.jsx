import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext"; // Added

// Components & Pages
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist"; // Added

const Home = () => (
  <div style={{ textAlign: "center", marginTop: "80px", color: "white" }}>
    <h1 style={{ fontSize: "48px" }}>Welcome to ShopStore 🛍️</h1>
    <p style={{ fontSize: "20px", color: "#1f5dba" }}>
      Discover the best products at unbeatable prices.
    </p>
    <a
      href="/products"
      style={{
        display: "inline-block",
        marginTop: "20px",
        padding: "12px 25px",
        backgroundColor: "#3b82f6",
        color: "white",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "18px",
      }}
    >
      Shop Now
    </a>
  </div>
);

function App() {
  return (
    <WishlistProvider>
      {" "}
      {/* Wrap around app */}
      <CartProvider>
        <Router>
          <Navbar />
          <div
            style={{
              minHeight: "100vh",
              backgroundColor: "#f4f6f8",
              paddingBottom: "50px",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />{" "}
              {/* New Route */}
            </Routes>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            theme="dark"
          />
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
