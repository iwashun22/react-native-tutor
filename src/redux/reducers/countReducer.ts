import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
}
export type ACTION_TYPES = "COUNT_INCREASE" | "COUNT_DECREASE";

const countSlice = createSlice({
  name: 'count',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
})

export default countSlice.reducer;
export const { increment, decrement } = countSlice.actions;