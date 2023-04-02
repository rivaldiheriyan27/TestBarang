import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {deleteItem} from "../slice"


export default function CardItem({
    item,key
}){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function deleteHandler(e, id) {
        e.preventDefault();
        const token = localStorage.getItem("accesToken")
        console.log(id)
        const actionResult = await dispatch(deleteItem({id,token}))
        // navigate("/products");
    }
    // // console.log(item.id)
    // const navigateToDetail = (e) => {
    //     console.log(id, "ini di pencet di card")
    //     // navigate(`/item/${id}`);
    // }

    // const TOedit= (id,e) => {
    //     // navigate(`/item/${id}`)
    // }

    return(
        <>
        <div className="max-w-sm mr-8 mb-5 mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex-shrink-0" >
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div>
                    <img className="rounded-t-lg h-06" src={item.photo} alt="" />
                </div>
                    <div className="p-5">
                        <button onClick={() => navigate(`/item/${item.id}`)}>
                             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.itemName}</h5>
                        </button>
                        <div className="flex flex-row mb-1">
                            <p className="mb-3 mr-2 font-normal text-gray-700 dark:text-gray-400"> Harga :</p>    
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  Rp.{item.sellPrice} </p>    
                        </div> 
                        <div className="flex flex-row">
                            <p className="mb-3 mr-2 font-normal text-gray-700 dark:text-gray-400"> Harga Beli :</p>    
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  Rp.{item.purchasePrice} </p>    
                        </div> 
                        <div className="flex flex-row">
                            <p className="mb-3 mr-2 font-normal text-gray-700 dark:text-gray-400"> Stock :</p>    
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  {item.stock} </p>    
                        </div> 
                        <button onClick={() => navigate(`/editItem/${item.id}`)} className="inline-flex items-center px-3 py-2 mr-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-800" >
                            Edit Item
                        </button>
                        <button onClick={(e) => deleteHandler(e, item.id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" >
                            Delete Item
                     </button>
                </div>
            </div>
        </div>
        </>
    )
}