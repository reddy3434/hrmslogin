import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: '30px',
          width: '100%',
          maxWidth: '900px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <h4
          style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '10px',
          }}
        >
          Welcome, {user?.name || user?.email || 'User'}!
        </h4>
        <p
          style={{
            color: '#6b7280',
            marginBottom: '30px',
            fontSize: '1rem',
          }}
        >
          This is your dashboard. Use the menu to manage users.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              flex: '1 1 300px',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
            }}
            onClick={() => navigate('/user-management')}
          >
            <h6
              style={{
                fontSize: '1.2rem',
                fontWeight: '500',
                color: '#1a202c',
                marginBottom: '10px',
              }}
            >
              Quick Action
            </h6>
            <p
              style={{
                color: '#4b5563',
                fontSize: '0.95rem',
                margin: 0,
              }}
            >
              Access user management to create or edit users.
            </p>
          </div>

          <div
            style={{
              flex: '1 1 300px',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
            }}
            onClick={() => navigate('/api-docs')}
          >
            <h6
              style={{
                fontSize: '1.2rem',
                fontWeight: '500',
                color: '#1a202c',
                marginBottom: '10px',
              }}
            >
              API
            </h6>
            <p
              style={{
                color: '#4b5563',
                fontSize: '0.95rem',
                margin: 0,
              }}
            >
              All API calls go to the backend at the configured base URL.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            Logout
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}