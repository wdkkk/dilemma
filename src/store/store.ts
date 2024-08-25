import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tasks from '../reducers/tasks'


export const store = configureStore({
  reducer: combineReducers({tasks})  
})
