import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function AdminDashboard() {
  const { user } = useAuth()
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome Admin <b>{user?.name}</b></p>
    </div>
  )
}
