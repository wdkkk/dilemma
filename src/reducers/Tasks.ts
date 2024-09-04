import { createSlice } from "@reduxjs/toolkit";
import { Settings, Task, TasksState } from "../types";

const initialState: TasksState = {
  tasks: [],
  settings: [
    {
      name: 'theme',
      value: 'light',
      options: ['light', 'dark', 'blue', 'red'],
    },
  ],
  isOpened: false,
  openedTaskId: -1
}


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks(state) {
      const localStorageTasks = localStorage['tasks']

      if (localStorageTasks) state.tasks = [...JSON.parse(localStorageTasks)]
    },
    changeTaskContent(state, action) {
      const localStorageTasks = JSON.parse(localStorage['tasks'])
      
      localStorageTasks.map((task: Task) => {
        if (task.id === action.payload.id) {
          task.content = action.payload.content
        }
      })

      localStorage.setItem('tasks', JSON.stringify(localStorageTasks)) 
      state.tasks = localStorageTasks
    },
    changeTaskTitle(state, action) {
      const localStorageTasks = JSON.parse(localStorage['tasks'])
      
      localStorageTasks.map((task: Task) => {
        if (task.id === action.payload.id) {
          task.title = action.payload.title
        }
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
    

    getSettings(state) { 
      const localStorageSettings = localStorage['settings']

      state.settings = JSON.parse(localStorageSettings)
    },
    initSettings(state) {
      if (!localStorage['settings']) {
        const initSettingsObj: Settings = [
          {
            name: 'theme',
            value: 'light',
            options: ['light', 'dark', 'blue', 'red'],
          },
        ]

        localStorage.setItem('settings', JSON.stringify(initSettingsObj))
        state.settings = initSettingsObj
      }
    },


    handleSettingsValueChange(state, action) {
      const localStorageSettings = localStorage['settings']
      const newLocalStorageSettings = JSON.parse(localStorageSettings)

      state.settings[action.payload.key].value = action.payload.option.value
      // state.settings['theme'].value = action.payload.option.value



      newLocalStorageSettings[action.payload.key].value = action.payload.option.value
      localStorage.setItem('settings', JSON.stringify(newLocalStorageSettings))
    },


    deleteLocalStorageData(state) {
      state.tasks = []

      localStorage.clear()
    }
  },
 
})

export default tasksSlice.reducer