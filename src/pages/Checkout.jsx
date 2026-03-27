import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address is too short"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^[0-9]{16}$/, "Must be exactly 16 digits"),
});

const Checkout = () => {
  const { cartTotal, cartItems } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Yahan actual app me backend API call hoti hai
    console.log("Order Data:", data);
    toast.success("Order Placed Successfully! 🎉", { theme: "dark" });

    // Clear cart in real app aur redirect
    setTimeout(() => {
      navigate("/");
      window.location.reload(); // Simple way to clear local storage context state for now
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate("/products");
    return null;
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#333",
    color: "white",
    boxSizing: "border-box",
  };
  const errorStyle = {
    color: "#ff4757",
    fontSize: "12px",
    margin: "5px 0 0 0",
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#1a1a1a",
        borderRadius: "10px",
        color: "white",
      }}
    >
      <h2>Checkout</h2>
      <p style={{ color: "#ccc", marginBottom: "20px" }}>
        Total Amount to Pay:{" "}
        <strong style={{ color: "#4ade80" }}>
          ${(cartTotal * 1.05).toFixed(2)}
        </strong>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label>Full Name</label>
          <input
            type="text"
            {...register("fullName")}
            style={inputStyle}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p style={errorStyle}>{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label>Email Address</label>
          <input
            type="email"
            {...register("email")}
            style={inputStyle}
            placeholder="john@example.com"
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        <div>
          <label>Shipping Address</label>
          <textarea
            {...register("address")}
            style={{ ...inputStyle, height: "80px", resize: "none" }}
            placeholder="123 Main Street..."
          />
          {errors.address && <p style={errorStyle}>{errors.address.message}</p>}
        </div>

        <div>
          <label>Card Number</label>
          <input
            type="text"
            {...register("cardNumber")}
            style={inputStyle}
            placeholder="1234567890123456"
            maxLength="16"
          />
          {errors.cardNumber && (
            <p style={errorStyle}>{errors.cardNumber.message}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "15px",
            backgroundColor: "#4ade80",
            color: "#111",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
