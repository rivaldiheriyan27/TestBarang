import { useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { createItemScreen } from "./slice";
import { useFormik } from "formik";
import swal from "sweetalert";

export default function CreateItem() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
          itemName:"",
          purchasePrice:0,
          sellPrice:0,
          stock:0,
          photo:``
        },
        onSubmit: async (value) => {
          try{
            console.log(value)
  
            const {itemName,purchasePrice,sellPrice,photo} = value

            const id = localStorage.getItem("id")
            const token = localStorage.getItem("accesToken")
    
            const newData = {
                itemName,purchasePrice,sellPrice,photo,UserId:id,
            }
            // console.log(newData,"ini data id",id,"ini token",token)
  
            const actionResult = await dispatch(createItemScreen({newData,token}))
            const actualResult = unwrapResult(actionResult)
    
            swal("Berhasl Register", "", "success");
            navigate("/item");
          }catch(error){
            console.log(error.error.message, "ini erornya")
            const message = error.error.message.name
            swal("Error", message, "error");
          }
        },
      });
    
    return(
        <>
            <Navbar />
            <div className="container mx-auto max-w-4xl bg-vla">
                <div className="bg-vla py-8 px-6 shadow-md rounded-lg mt-10">
                    <h2 className="mt-1 mb-8 mr-4 text-center text-3xl font-bold text-smalt">
                        Create Item
                    </h2>
                    <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                        <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="itemName"
                        name="itemName"
                        type="text" 
                        onChange={formik.handleChange}
                        value={formik.values.itemName}
                        />
                    </div>
                    <div className="mb-6">
                        <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Purchase Price</label>
                        <input className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="purchasePrice"
                        name="purchasePrice"
                        type="number" 
                        onChange={formik.handleChange}
                        value={formik.values.purchasePrice}
                        />
                    </div>
                    <div className="mb-6">
                        <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sell Price</label>
                        <input className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="sellPrice"
                        name="sellPrice"
                        type="number" 
                        onChange={formik.handleChange}
                        value={formik.values.sellPrice}
                        />
                    </div>
                    <div className="mb-6">
                        <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                        <input className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        id="stock"
                        name="stock"
                        type="number" 
                        onChange={formik.handleChange}
                        value={formik.values.stock}
                        />
                    </div>

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" type="file" 
                     id="photo"
                     name="photo"
                     onChange={formik.handleChange}
                     value={formik.values.photo}
                    />
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Upload your photo here</div>
                    <button type="submit" className="mt-2 mx-auto justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Default
                    </button>
                    </form>
                
                </div>
            </div>
        </>
    )
}