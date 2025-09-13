import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function SuperAdminDashboard() {
  const { user } = useAuth()
  return (
    <div>
      <h2>SuperAdmin Dashboard</h2>
      <p>Welcome SuperAdmin <b>{user?.name}</b></p>
    </div>
  )
}
