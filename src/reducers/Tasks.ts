import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [
      'Task', 'Test task', '123', 'Products', 'Wanna buy'
    ]
  },
  reducers: {
  }
})

export default tasksSlice.reducer