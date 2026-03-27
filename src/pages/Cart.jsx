import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "white" }}>
        <h2>Your Cart is Empty 🛒</h2>
        <p style={{ color: "#888", marginBottom: "20px" }}>
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        display: "flex",
        gap: "30px",
        flexWrap: "wrap",
        color: "white",
      }}
    >
      {/* Cart Items List */}
      <div style={{ flex: 2, minWidth: "300px" }}>
        <h2>Shopping Cart</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                backgroundColor: "#1a1a1a",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 5px 0" }}>
                  {item.title.substring(0, 30)}...
                </h4>
                <p style={{ margin: 0, color: "#4ade80", fontWeight: "bold" }}>
                  ${item.price}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#333",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#444",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <span style={{ width: "20px", textAlign: "center" }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#444",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>

              <strong style={{ width: "80px", textAlign: "right" }}>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  color: "#ff4757",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div
        style={{
          flex: 1,
          minWidth: "300px",
          backgroundColor: "#1a1a1a",
          padding: "25px",
          borderRadius: "10px",
          height: "fit-content",
        }}
      >
        <h3>Order Summary</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
            color: "#ccc",
          }}
        >
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
            color: "#ccc",
          }}
        >
          <span>Tax (5%)</span>
          <span>${(cartTotal * 0.05).toFixed(2)}</span>
        </div>
        <hr style={{ borderColor: "#333" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <span>Total</span>
          <span style={{ color: "#4ade80" }}>
            ${(cartTotal * 1.05).toFixed(2)}
          </span>
        </div>

        <Link
          to="/checkout"
          style={{
            display: "block",
            textAlign: "center",
            width: "100%",
            padding: "15px",
            backgroundColor: "#3b82f6",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            boxSizing: "border-box",
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
