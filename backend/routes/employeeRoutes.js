import express from 'express'
import {
  listEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  removeEmployee
} from '../controllers/employeeController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, listEmployees)
router.get('/:id', authMiddleware, getEmployee)
router.post('/', authMiddleware, addEmployee)
router.put('/:id', authMiddleware, editEmployee)
router.delete('/:id', authMiddleware, removeEmployee)

export default router
