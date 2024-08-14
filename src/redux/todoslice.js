import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        color: action.payload.color || 'white', // Default color
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos[index].completed = !state.todos[index].completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, newText, color } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todos[index].text = newText;
        if (color) {
          state.todos[index].color = color; // Update color if provided
        }
      }
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
