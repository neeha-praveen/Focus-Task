import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    // Add your login logic here
    console.log('Login clicked');
  };

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className='navbar-left'>
        <div className="logo">
          <img src={assets.logo} alt="Logo" />
        </div>
      </div>
      <div className="navbar-right">
        <div className="login">
          <button 
            className="login-btn" 
            onClick={handleLoginClick}
            aria-label="Login to your account"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;