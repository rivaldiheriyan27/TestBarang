import { createAsyncThunk } from '@reduxjs/toolkit'
import {createItem} from "../../api/dataItem"

const sliceName = 'loginScreen'


export const createItemScreen = createAsyncThunk(
    `${sliceName}/createItem`,
    async (arg, thunkAPI) => {
      try {
        // console.log(arg , "ini di slice")
        const response = await createItem(arg)
        console.log(response)

        return thunkAPI.fulfillWithValue(response.data)
      } catch (error) {
        console.log(error,"ini error di slice")
        return thunkAPI.rejectWithValue(error.response.data)
      }
    },
)
  