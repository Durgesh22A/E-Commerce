import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  // Total calculate karna
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', padding: '20px' }}>
        <h2>Your Cart is Empty 🛒</h2>
        <p style={{ color: '#888', marginBottom: '20px' }}>Looks like you haven't added anything yet.</p>
        <Link to="/products" style={{ padding: '10px 20px', backgroundColor: '#0984e3', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Shopping Cart</h2>
      
      {cartItems.map((item) => (
        <div key={item.id} style={{ 
          display: 'flex', 
          flexWrap: 'wrap', /* 📱 Mobile Fix: Choti screen par items wrap honge */
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '15px', 
          backgroundColor: '#fff', 
          borderRadius: '10px', 
          marginBottom: '15px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          gap: '15px'
        }}>
          {/* 🐛 Image Bug Fix: src mein item.thumbnail use kiya hai */}
          <img src={item.thumbnail} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '5px' }} />
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#2d3436' }}>{item.title}</h4>
            <p style={{ margin: 0, color: '#0984e3', fontWeight: 'bold' }}>${item.price}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#f1f2f6', padding: '5px 10px', borderRadius: '8px' }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
            <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ border: 'none', background: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
          </div>
          
          <button 
            onClick={() => removeFromCart(item.id)} 
            style={{ color: '#ff4757', border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', padding: '10px' }}
            title="Remove Item"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      
      <div style={{ textAlign: 'right', marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '24px', margin: '0 0 15px 0' }}>Total: <span style={{ color: '#0984e3' }}>${totalAmount.toFixed(2)}</span></h3>
        <Link to="/checkout" style={{ padding: '12px 25px', backgroundColor: '#00b894', color: 'white', textDecoration: 'none', borderRadius: '8px', display: 'inline-block', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 10px rgba(0, 184, 148, 0.3)' }}>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;