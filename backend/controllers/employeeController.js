import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../models/employeeModel.js'

export async function listEmployees(req, res) {
  try {
    const employees = await getEmployees()
    res.json({ employees })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function getEmployee(req, res) {
  try {
    const employee = await getEmployeeById(req.params.id)
    if (!employee) return res.status(404).json({ message: 'Not found' })
    res.json({ employee })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function addEmployee(req, res) {
  try {
    const { name, email, position, salary } = req.body
    if (!name || !email) return res.status(400).json({ message: 'Name and email required' })
    const employee = await createEmployee({ name, email, position, salary })
    res.status(201).json({ employee })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function editEmployee(req, res) {
  try {
    const { id } = req.params
    const { name, email, position, salary } = req.body
    const employee = await updateEmployee(id, { name, email, position, salary })
    res.json({ employee })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function removeEmployee(req, res) {
  try {
    await deleteEmployee(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
