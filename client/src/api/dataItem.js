import axios from "axios";

const baseUrl = "http://localhost:4000"

export const dataItems = async (token,searchItemName, page) => {
    try{
        console.log(token)
        let url = `${baseUrl}/item/?page=${page}&size=5`
        if(searchItemName){
            url += `&search=${searchItemName}`
        }        

        console.log(url,"ini url")
        const dataBaru = await axios.get(url,{
            headers: {
                access_token: `${token}`,
            },
          })

        console.log(dataBaru , "ini data baru di axios")
        return dataBaru
    }catch(err){
        console.log(err,"ini erro")
        throw err
    }
}

export const getItemById = async({token,id}) => {
    try {
        console.log(token,id,"ini di api")
        const hasil =  await axios.get(`${baseUrl}/item/${id}`,{
            headers: {
                access_token: `${token}`,
            },
        })

      console.log(hasil,"ini hasil")
      return hasil
    } catch (error) {
      throw error
    }
  }
  

export const createItem = async ({ newData, token }) => {
    try {
      let formData = new FormData();
      formData.append("photo", newData.photo);
      console.log(formData.get("photo"), "ini append");

      const phpto = formData.get("photo")
      console.log(phpto,"ini data kiriman")
  
      const { data } = await axios.post(`${baseUrl}/uploads`, formData, {
        headers: {
            access_token: `${token}`,
          },
      });
      let mainImg = data.shift();
  
      return await axios.post(
        `${baseUrl}`,
        {
          itemName: newData.itemName,
          purchasePrice: newData.purchasePrice,
          sellPrice: newData.sellPrice,
          stock: newData.stock,
          photo: mainImg,
        },
        {
          headers: {
            access_token: `${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error, "ini error");
      throw error;
    }
  };
  
export const updateItem = async request => {
    try {

        console.log("ini api" , request)

      return await axios.put(
        `${baseUrl}/item/${request.input.id}`,
        { itemName : request.input.itemName,
          purchasePrice : request.input.purchasePrice,
          sellPrice : request.input.sellPrice,
          stock : request.input.stock
         },
        {
            headers: {
                access_token: `${request.input.token}`,
            },
        },
      )
    } catch (error) {
      throw error;
    }
}

export const deleteItemApi = async request => {
    try {

        console.log("ini api" , request)
        return await axios.delete(`${baseUrl}/item/${request.id}`,{
            headers: {
                access_token: `${request.token}`,
            },
        })
    } catch (error) {
      throw error;
    }
}


