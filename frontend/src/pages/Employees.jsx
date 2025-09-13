import React, { useEffect, useState } from 'react'
import employeeService from '../services/employeeService'

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState({ name: '', email: '', position: '', salary: '' })
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState(null)

  const load = async () => {
    try {
      const list = await employeeService.getAll()
      setEmployees(Array.isArray(list) ? list : [])
    } catch (err) {
      setError('Failed to load employees')
      setEmployees([])
    }
  }

  useEffect(() => { load() }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editing) {
        await employeeService.update(editing, form)
      } else {
        await employeeService.create(form)
      }
      setForm({ name: '', email: '', position: '', salary: '' })
      setEditing(null)
      load()
    } catch (err) {
      setError('Error saving employee')
    }
  }

  const handleEdit = emp => {
    setForm({ name: emp.name, email: emp.email, position: emp.position, salary: emp.salary })
    setEditing(emp.id)
  }

  const handleDelete = async id => {
    try {
      await employeeService.remove(id)
      load()
    } catch {
      setError('Error deleting employee')
    }
  }

  return (
    <div>
      <h2>Employee Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col">
            <input className="form-control" placeholder="Name" name="name"
              value={form.name} onChange={handleChange} required />
          </div>
          <div className="col">
            <input className="form-control" placeholder="Email" type="email" name="email"
              value={form.email} onChange={handleChange} required />
          </div>
          <div className="col">
            <input className="form-control" placeholder="Position" name="position"
              value={form.position} onChange={handleChange} />
          </div>
          <div className="col">
            <input className="form-control" placeholder="Salary" name="salary"
              value={form.salary} onChange={handleChange} />
          </div>
          <div className="col">
            <button className="btn btn-primary" type="submit">
              {editing ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Position</th><th>Salary</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.length > 0 ? employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(emp)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="6" className="text-center">No employees found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
