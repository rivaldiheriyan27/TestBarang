import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../../api/accounts'

const sliceName = 'loginScreen'


export const registerScreenRegisterUser = createAsyncThunk(
    `${sliceName}/loginUser`,
    async (arg, thunkAPI) => {
      try {
        console.log("masuk sini")
        const response = await registerUser(arg)
        console.log(response)

        return thunkAPI.fulfillWithValue(response.data)
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    },
)
  