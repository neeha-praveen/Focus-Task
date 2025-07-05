import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { CircleUserRound, Lock, X } from 'lucide-react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = (user, pass) => {
    localStorage.setItem("credentials", JSON.stringify({ username: user, password: pass }));
    setModal(false);
    setUsername(user);
    setPassword('');
  }

  const handleLogout = () => {
    localStorage.removeItem('credentials');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
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
                setUsername('');
                setPassword('');
              }}>
              <X />
            </button>
          </div>
          <div className="modal-body">
            <form action="" onSubmit={(e) => { e.preventDefault(); handleLogin(username, password) }}>
              <div className="input-group">
                <CircleUserRound/>
                <input
                  type="text"
                  id='username'
                  name='username'
                  placeholder='Username'
                  className='input-username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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