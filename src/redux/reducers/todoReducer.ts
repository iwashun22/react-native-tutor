import { createSlice } from '@reduxjs/toolkit';

export interface Task {
  id: string,
  taskName: string, 
  complete: boolean, 
  createdAt: Date
}
const initialState: { 
  list: Array<Task>,
} = {
  list: [],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    addTodo: (state, action: {payload: Task}) => {
      console.log(action.payload);
      state.list.push(action.payload);
    },
    toggleTodoComplete: (state, action: { payload: { id: string } }) => {
      console.log(action.payload.id);
      state.list = state.list.map(task => {
        if(task.id !== action.payload.id) return task;
        return {
          ...task,
          complete: !task.complete
        };
      });
    },
    removeTodo: (state, action: { payload: { id: string } }) => {
      console.log(action.payload.id);
      state.list = state.list.filter(task => task.id !== action.payload.id);
    }
  }
})

export const { addTodo, toggleTodoComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;