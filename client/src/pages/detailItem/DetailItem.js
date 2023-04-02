import { Route, Router, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {detailScreenGetItem, resetState} from "./slice"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function DetailItem(){
    const dispatch = useDispatch()
    const Route = useParams()

    const id = Route.id;
    console.log(id)
  
    const stateDetail = useSelector(state => state.detailItemPackage)
    const { detailItemPackage } = stateDetail

    console.log(detailItemPackage ," ini datanya")
  
    const doTheLogic = async e => {
        const token = localStorage.getItem("accesToken")
  
      await dispatch(detailScreenGetItem({ id, token }))
      // const actualResult = unwrapResult(actionResult)
    }
  

    
    useEffect(() => {
      doTheLogic()
    }, [])
    
    return(
        <>
            <Navbar />
            <div className="container mx-auto max-w-4xl bg-vla">
                <div className="bg-vla py-8 px-6 shadow-md rounded-lg mt-10">
                    <h2 className="mt-1 mb-8 mr-4 text-center text-3xl font-bold text-smalt">{detailItemPackage.data.itemName}</h2>
                    <div className="flex flex-row items-center bg-white">
                        <img className="object-cover w-full md:w-auto rounded-t-lg h-96 md:h-auto md:rounded-none md:rounded-l-lg" src={detailItemPackage.data.photo} alt=""/>
                        <div className="flex flex-col justify-between p-4 leading-normal md:ml-4">
                            <div className="flex flex-row mb-1">
                            <p className="mb-3 mr-2 font-normal text-gray-700 dark:text-gray-400"> Harga :</p>    
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  Rp.{detailItemPackage.data.sellPrice} </p>    
                        </div> 
                        <div className="flex flex-row">
                            <p className="mb-3 mr-2 font-normal text-gray-700 dark:text-gray-400"> Harga Beli :</p>    
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  Rp.{detailItemPackage.data.purchasePrice} </p>    
                        </div> 
                        <div className="flex flex-row">
                            <p className="mb-3 mr-2 font-normal text-gray-700 dark:text-gray-400"> Stock :</p>    
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">  {detailItemPackage.data.stock} </p>    
                        </div> 
                    </div>
                    </div>  
                </div>
            </div>
        </>
    )
}