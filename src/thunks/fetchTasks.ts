import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const res = await axios.get('http://localhost:8080/tasks')

    if (res.status) return res.data
  }
)