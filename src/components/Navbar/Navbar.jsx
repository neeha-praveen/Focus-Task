import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { CircleUserRound, Lock, X } from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [username, setUsername] = useState(''); // This will hold the logged-in user's name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = (user, pass) => {
    localStorage.setItem("credentials", JSON.stringify({ username: user, password: pass }));
    setModal(false);
    setUsername(user); // Set the logged-in username
    setFormUsername(''); // Clear the form
    setFormPassword(''); // Clear the form
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('credentials');
    setIsLoggedIn(false);
    setUsername('');
    setFormUsername('');
    setFormPassword('');
  }

  useEffect(() => {
    const creds = localStorage.getItem('credentials');
    if (creds) {
      const parsedCreds = JSON.parse(creds);
      setIsLoggedIn(true);
      setUsername(parsedCreds.username);
    }
  }, [])

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <div className="logo">
          <img src={assets.logo} alt="Logo" />
        </div>
      </div>
      <div className="navbar-right">
        {!isLoggedIn ? (
          <div className="login">
            <button
              className="login-btn"
              onClick={() => { setModal(true) }}
              aria-label="Login to your account"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="user-info">
            <button className='user-logout-btn'
              onClick={handleLogout}
              onMouseEnter={() => { setIsHovered(true) }}
              onMouseLeave={() => { setIsHovered(false) }}
            >
              {isHovered ? (
                <span className='logout-text'>Logout</span>
              ) : (
                <div className="user-stuff">
                  <CircleUserRound className='user-icon' />
                  <span>{username}</span>
                </div>
              )}
            </button>
          </div>
        )}
      </div>

      {modal && (
        <div className="login-modal">
          <div className="modal-header">
            <h3>Login</h3>
            <button
              className='close-btn'
              onClick={() => {
                setModal(false);
                setFormUsername('');
                setFormPassword('');
              }}>
              <X />
            </button>
          </div>
          <div className="modal-body">
            <form action="" onSubmit={(e) => { e.preventDefault(); handleLogin(formUsername, formPassword) }}>
              <div className="input-group">
                <CircleUserRound/>
                <input
                  type="text"
                  id='username'
                  name='username'
                  placeholder='Username'
                  className='input-username'
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  required
                  autoFocus={true}
                />
              </div>

              <div className="input-group">
                <Lock/>
                <input
                  type="password"
                  id='password'
                  name='password'
                  placeholder='Password'
                  className='input-password'
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="login-modal-btn-div">
                <button type='submit' className="login-modal-btn">LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;