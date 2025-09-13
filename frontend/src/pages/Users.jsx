import React, { useEffect, useState, useRef } from 'react';
import api from '../api/axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: '', email: '', password: '' });
    if (modalRef.current) {
      modalRef.current.style.display = 'block';
      setTimeout(() => {
        modalRef.current.style.opacity = '1';
        modalRef.current.querySelector('.modal-content').style.transform = 'translateY(0)';
      }, 10);
    }
  };

  const openEdit = (u) => {
    setEditingId(u._id || u.id || null);
    setForm({ name: u.name || '', email: u.email || '', password: '' });
    if (modalRef.current) {
      modalRef.current.style.display = 'block';
      setTimeout(() => {
        modalRef.current.style.opacity = '1';
        modalRef.current.querySelector('.modal-content').style.transform = 'translateY(0)';
      }, 10);
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.opacity = '0';
      modalRef.current.querySelector('.modal-content').style.transform = 'translateY(-50px)';
      setTimeout(() => {
        modalRef.current.style.display = 'none';
      }, 300);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/api/users/${editingId}`, { name: form.name, email: form.email });
      } else {
        await api.post('/api/users', form);
      }
      closeModal();
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h4
            style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              color: '#1a202c',
            }}
          >
            Users
          </h4>
          <button
            onClick={openCreate}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
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
            Create User
          </button>
        </div>

        {loading && (
          <div
            style={{
              textAlign: 'center',
              color: '#4b5563',
              fontSize: '1rem',
              marginBottom: '20px',
            }}
          >
            Loading...
          </div>
        )}
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
            overflowX: 'auto',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#1a202c',
                }}
              >
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>#</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((u, idx) => (
                  <tr
                    key={u._id || u.id || idx}
                    style={{
                      transition: 'background-color 0.2s ease-in-out',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '12px' }}>{idx + 1}</td>
                    <td style={{ padding: '12px' }}>{u.name}</td>
                    <td style={{ padding: '12px' }}>{u.email}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => openEdit(u)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: 'transparent',
                          color: '#6b7280',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          marginRight: '8px',
                          transition: 'color 0.2s ease-in-out, border-color 0.2s ease-in-out',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = '#3b82f6';
                          e.target.style.borderColor = '#3b82f6';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = '#6b7280';
                          e.target.style.borderColor = '#d1d5db';
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u._id || u.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: 'transparent',
                          color: '#dc2626',
                          border: '1px solid #dc2626',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'color 0.2s ease-in-out, border-color 0.2s ease-in-out',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.color = '#b91c1c';
                          e.target.style.borderColor = '#b91c1c';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.color = '#dc2626';
                          e.target.style.borderColor = '#dc2626';
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      color: '#6b7280',
                    }}
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for create/edit */}
        <div
          ref={modalRef}
          style={{
            
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
            zIndex: 1050,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              padding: '20px',
              width: '100%',
              maxWidth: '500px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-50px)',
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <h5
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1a202c',
                }}
              >
                {editingId ? 'Edit User' : 'Create User'}
              </h5>
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.2rem',
                  color: '#6b7280',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ position: 'relative' }}>
                <label
                  style={{
                    position: 'absolute',
                    top: form.name ? '-8px' : '12px',
                    left: '12px',
                    fontSize: form.name ? '0.75rem' : '1rem',
                    color: form.name ? '#3b82f6' : '#6b7280',
                    transition: 'all 0.2s ease-in-out',
                    pointerEvents: 'none',
                    backgroundColor: form.name ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                    padding: '0 4px',
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
              <div style={{ position: 'relative' }}>
                <label
                  style={{
                    position: 'absolute',
                    top: form.email ? '-8px' : '12px',
                    left: '12px',
                    fontSize: form.email ? '0.75rem' : '1rem',
                    color: form.email ? '#3b82f6' : '#6b7280',
                    transition: 'all 0.2s ease-in-out',
                    pointerEvents: 'none',
                    backgroundColor: form.email ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                    padding: '0 4px',
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              {!editingId && (
                <div style={{ position: 'relative' }}>
                  <label
                    style={{
                      position: 'absolute',
                      top: form.password ? '-8px' : '12px',
                      left: '12px',
                      fontSize: form.password ? '0.75rem' : '1rem',
                      color: form.password ? '#3b82f6' : '#6b7280',
                      transition: 'all 0.2s ease-in-out',
                      pointerEvents: 'none',
                      backgroundColor: form.password ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
                      padding: '0 4px',
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
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
              )}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#4b5563')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#6b7280')}
              >
                Close
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  padding: '10px 20px',
                  backgroundColor: saving ? '#93c5fd' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out',
                }}
                onMouseOver={(e) => !saving && (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => !saving && (e.target.style.transform = 'translateY(0)')}
              >
                {saving ? 'Saving...' : 'Save'}
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
    </div>
  );
}