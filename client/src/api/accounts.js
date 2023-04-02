import axios from 'axios'

const baseUrl = "http://localhost:4000";

export const loginUser = async request => {
    try {
      return await axios.post(`${baseUrl}/login`,request)
    } catch (e) {
      console.log(e)
      
      throw e
    }
}

export const registerUser = async request => {
    try {
        console.log(request)
        return await axios.post(`${baseUrl}/register`,request)
    } catch (e) {
        console.log(e)
      throw e
    }
}