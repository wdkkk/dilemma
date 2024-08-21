import { createSlice } from "@reduxjs/toolkit";
import { Task, TasksState } from "../types";

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  isOpened: false,
  openedTaskId: -1
}


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks(state) {
      const localStorageTasks = JSON.parse(localStorage['tasks'])
      
      state.tasks = [...localStorageTasks]
    },
    changeTask(state, action) {
      const localStorageTasks = JSON.parse(localStorage['tasks'])
      
      localStorageTasks.map((task: Task) => {
        if (task.id === action.payload.id) task.content = action.payload.content
        
      })

      localStorage.setItem('tasks', JSON.stringify(localStorageTasks)) 
      state.tasks = localStorageTasks
    },
    openTask(state, action) {
      state.isOpened = true
      state.openedTaskId = action.payload.openedTaskId
    },
  },
 
})

export default tasksSlice.reducer