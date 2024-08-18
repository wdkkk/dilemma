import { combineReducers, configureStore } from '@reduxjs/toolkit'
import Tasks from '../reducers/Tasks'


export const store = configureStore({
  reducer: combineReducers({Tasks})  
})


store.subscribe(() => console.log(store.getState()))