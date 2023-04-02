import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getItemById } from '../../api/dataItem'

const nameScreen = 'detailItem'

export const detailScreenGetItem = createAsyncThunk(
  `${nameScreen}/getDetailItem`,
  async (arg, thunkAPI) => {
    try {
        console.log(arg,"ini di slice")
      const response = await getItemById(arg)
      console.log("berhasil")
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
        console.log(":ini errro ", error)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

const initialState = {
  isLoading: true,
  detailItemPackage: [],
  error: '',
}

const itemIdSlice = createSlice({
  name: `Detail`,
  initialState,
  reducers: {
    resetState: () => {
      return initialState
    },
  },
  extraReducers: {
    [detailScreenGetItem.pending]: state => {
      state.isLoading = true
    },
    [detailScreenGetItem.fulfilled]: (state, action) => {
      state.detailItemPackage = action.payload
      state.isLoading = false
    },
    [detailScreenGetItem.rejected]: (state, action) => {
      state.isLoading = false
      state.detailItemPackage = []
      state.error = action.error.message
    },
  },
})

export const { resetState } = itemIdSlice.actions
export default itemIdSlice.reducer
