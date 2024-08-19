import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TasksState } from "../types";
import axios from "axios";

const initialState: TasksState = {
  tasks: [
    {
      id: 40,
      title: 'test task',
      content: '<h1>inital state task</h1>'
    },
  ],
  status: 'idle',
  isOpened: false,
  openedTaskId: -1
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const res = await axios.get('http://localhost:8080/tasks')

    if (res.status) return res.data
  }
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    openTask(state, action) {
      state.isOpened = true
      state.openedTaskId = action.payload.openedTaskId
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks.push(...action.payload)
      })
      .addCase(fetchTasks.rejected, (state ) => {
        state.status = 'rejected'
      })
  }
})

export default tasksSlice.reducer