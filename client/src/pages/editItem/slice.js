import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateItem, getItemById  } from '../../api/dataItem'

const sliceName = 'editItemScreen'

export const updateDataItem = createAsyncThunk(
  `${sliceName}/updateAccount`,
  async (arg, thunkAPI) => {
    try {
      const response = await updateItem(arg)
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log(error.message, 'err')
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const detailScreenGetItem = createAsyncThunk(
    `${sliceName}/getDetailItem`,
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