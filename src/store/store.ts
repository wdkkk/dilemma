import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tasks from '../reducers/Tasks'


export const store = configureStore({
  reducer: combineReducers({tasks})  
})
