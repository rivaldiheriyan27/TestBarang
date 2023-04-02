import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser } from '../../api/accounts'

const sliceName = 'loginScreen'


export const loginScreenLoginUser = createAsyncThunk(
    `${sliceName}/loginUser`,
    async (arg, thunkAPI) => {
      try {
        const response = await loginUser(arg)
        console.log(response)

        return thunkAPI.fulfillWithValue(response.data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    },
  )
  