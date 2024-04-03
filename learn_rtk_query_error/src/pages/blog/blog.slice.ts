import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BlogState {
  id: string
}

const initialState: BlogState = {
  id: ''
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditing: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    cancelEditing: (state) => {
      state.id = ''
    }
  }
})

const blogReducer = blogSlice.reducer
export const {cancelEditing, startEditing} = blogSlice.actions
export default blogReducer
