import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { dataItems,deleteItemApi } from "../../api/dataItem"

const sliceName = 'storeItem'

export const itemStore = createAsyncThunk(
    `${sliceName}/getActivity`,
    async (arg, thunkAPI) => {
      try {
        console.log(arg , "ini data slice")
        const response = await dataItems(arg.token , arg.searchItemName, arg.page)
        console.log(response.data.data, "ini hasil response")
        return thunkAPI.fulfillWithValue(response.data.data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    },
)

export const deleteItem = createAsyncThunk(
    `${sliceName}/deleteItem`,
    async (arg, thunkAPI) => {
      try {
        console.log(arg , "ini data slice")
        const response = await deleteItemApi(arg)
        // console.log(response.data.data, "ini hasil response")
        // return thunkAPI.fulfillWithValue(response.data.data)
      } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.response.data)
      }
    },
)



const initialState = {
    itemPackage: [],
    isLoading: false,
    isError: '',
}

const itemSlice = createSlice({
    name : "booksData",
    initialState,
    reducers:{
        resetState: () => {
            return initialState
        },
    },
    extraReducers: {
        [itemStore.pending]: state => {
          state.isLoading = true
        },
        [itemStore.fulfilled]: (state, action) => {
        //   state.isLoading = false
          state.itemPackage = action.payload
        },
        [itemStore.rejected]: (state, action) => {
        //   state.isLoading = false
          state.itemPackage = []
          state.isError = action.error.message
        },
      },
})

export const { resetState } = itemSlice.actions
export default itemSlice.reducer