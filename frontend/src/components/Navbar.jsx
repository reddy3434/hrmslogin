import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      style={{
        backgroundColor: '#3b82f6',
        padding: '1rem 2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <img
            src="https://via.placeholder.com/40?text=Logo"
            alt="Logo"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain',
            }}
          />
          <Link
            to="/"
            style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.target.style.opacity = '0.8')}
            onMouseOut={(e) => (e.target.style.opacity = '1')}
          >
            My App
          </Link>
        </div>

        <button
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="mobile-toggle"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div
          style={{
            display: isMenuOpen ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            marginTop: '1rem',
            animation: isMenuOpen ? 'slideIn 0.3s ease-in-out' : 'none',
          }}
          className="mobile-menu"
        >
          {token && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Dashboard
              </Link>
              <Link
                to="/users"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Users
              </Link>
            </div>
          )}
          {!token ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <Link
                to="/login"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem',
                  fontSize: '1rem',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Register
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  color: 'white',
                  padding: '0.5rem',
                  fontSize: '1rem',
                }}
              >
                Hi, {user?.name || user?.email || 'User'}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
          className="desktop-menu"
        >
          {token && (
            <>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'opacity 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.target.style.opacity = '0.8')}
                onMouseOut={(e) => (e.target.style.opacity = '1')}
              >
                Dashboard
              </Link>
              <Link
                to="/users"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'opacity 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.target.style.opacity = '0.8')}
                onMouseOut={(e) => (e.target.style.opacity = '1')}
              >
                Users
              </Link>
            </>
          )}
          {!token ? (
            <>
              <Link
                to="/login"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'opacity 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.target.style.opacity = '0.8')}
                onMouseOut={(e) => (e.target.style.opacity = '1')}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transition: 'opacity 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.target.style.opacity = '0.8')}
                onMouseOut={(e) => (e.target.style.opacity = '1')}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span
                style={{
                  color: 'white',
                  fontSize: '1rem',
                }}
              >
                Hi, {user?.name || user?.email || 'User'}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .mobile-toggle {
            display: block !important;
          }
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu {
            display: ${isMenuOpen ? 'flex' : 'none'} !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-toggle {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}