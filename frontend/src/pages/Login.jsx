import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <img
            src="https://via.placeholder.com/100?text=Logo"
            alt="Logo"
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
            }}
          />
        </div>
        <h3
          style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#1a202c',
          }}
        >
          Welcome Back
        </h3>

        {error && (
          <div
            style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center',
              animation: 'shake 0.3s ease-in-out',
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              position: 'relative',
            }}
          >
            <label
              style={{
                position: 'absolute',
                top: email ? '-8px' : '12px',
                left: '12px',
                fontSize: email ? '0.75rem' : '1rem',
                color: email ? '#3b82f6' : '#6b7280',
                transition: 'all 0.2s ease-in-out',
                pointerEvents: 'none',
                backgroundColor: email ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                padding: '0 4px',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease-in-out',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <div
            style={{
              position: 'relative',
            }}
          >
            <label
              style={{
                position: 'absolute',
                top: password ? '-8px' : '12px',
                left: '12px',
                fontSize: password ? '0.75rem' : '1rem',
                color: password ? '#3b82f6' : '#6b7280',
                transition: 'all 0.2s ease-in-out',
                pointerEvents: 'none',
                backgroundColor: password ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                padding: '0 4px',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease-in-out',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                flex: '1',
                padding: '12px',
                backgroundColor: loading ? '#93c5fd' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              style={{
                flex: '1',
                padding: '12px',
                backgroundColor: 'transparent',
                color: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out',
              }}
              onMouseOver={(e) => (e.target.style.color = '#2563eb')}
              onMouseOut={(e) => (e.target.style.color = '#3b82f6')}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}