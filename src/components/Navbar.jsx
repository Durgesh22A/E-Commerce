import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaShoppingCart, FaHeart, FaStore } from 'react-icons/fa';

const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '15px 5%', 
      backgroundColor: '#ffffff', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
      color: '#333', 
      alignItems: 'center', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      flexWrap: 'wrap',
      gap: '15px'
    }}>
      <h2>
        <Link to="/" style={{ color: '#0984e3', textDecoration: 'none', fontSize: '24px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaStore /> ShopStore
        </Link>
      </h2>
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        alignItems: 'center', 
        fontWeight: '600',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link to="/" style={{ color: '#636e72', textDecoration: 'none', fontSize: '16px', transition: '0.3s' }}>Home</Link>
        <Link to="/products" style={{ color: '#636e72', textDecoration: 'none', fontSize: '16px', transition: '0.3s' }}>Explore</Link>
        
        {/* Wishlist Badge */}
        <Link to="/wishlist" style={{ color: '#636e72', textDecoration: 'none', fontSize: '20px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <FaHeart style={{ color: wishlistItems.length > 0 ? '#ff4757' : '#b2bec3', fontSize: '24px' }} />
          {wishlistItems.length > 0 && (
            <span style={{ position: 'absolute', top: '-5px', right: '-10px', backgroundColor: '#ff4757', color: 'white', height: '18px', width: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '10px', fontWeight: 'bold', border: '2px solid white' }}>
              {wishlistItems.length}
            </span>
          )}
        </Link>

        {/* Cart Link */}
        <Link to="/cart" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0984e3', padding: '8px 15px', borderRadius: '30px', boxShadow: '0 4px 10px rgba(9, 132, 227, 0.3)' }}>
          <FaShoppingCart />
          <span style={{ fontWeight: 'bold' }}>{cartCount > 0 ? cartCount : 'Cart'}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;