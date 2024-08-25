import { createSlice } from "@reduxjs/toolkit";
import { Task, TasksState } from "../types";

const initialState: TasksState = {
  tasks: [],
  isOpened: false,
  openedTaskId: -1
}


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks(state) {
      const localStorageTasks = localStorage['tasks']

      state.tasks = [...JSON.parse(localStorageTasks)]
    },
    changeTask(state, action) {
      const localStorageTasks = JSON.parse(localStorage['tasks'])
      
      localStorageTasks.map((task: Task) => {
        if (task.id === action.payload.id) task.content = action.payload.content
      })

      localStorage.setItem('tasks', JSON.stringify(localStorageTasks)) 
      state.tasks = localStorageTasks
    },
    addTask(state, action) {
      const localStorageTasks = localStorage['tasks']

      if (localStorageTasks) {
        const newLocalStorageTasks = JSON.parse(localStorageTasks)
        newLocalStorageTasks.push(action.payload.obj)
        
        localStorage.setItem('tasks', JSON.stringify(newLocalStorageTasks)) 
        state.tasks = newLocalStorageTasks
      }
      else {
        const newLocalStorageTasks = [action.payload.obj]

        localStorage.setItem('tasks', JSON.stringify(newLocalStorageTasks)) 
        state.tasks = newLocalStorageTasks
      }
    },
    deleteTask(state, action) {
      const localStorageTasks = JSON.parse(localStorage['tasks'])
      
      console.log(localStorageTasks)
      const newLocalStorageTasks = localStorageTasks.filter((task: Task) => task.id !== action.payload.id)

      localStorage.setItem('tasks', JSON.stringify(newLocalStorageTasks)) 
      state.tasks = newLocalStorageTasks
    },
    openTask(state, action) {
      state.isOpened = true
      state.openedTaskId = action.payload.openedTaskId
    },
  },
 
})

export default tasksSlice.reducer