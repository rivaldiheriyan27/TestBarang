import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import { itemStore, resetState } from "./slice"
import CardItem from "./components/CardItem";


export default function ItemHome() {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState({
        search : ""
    });

    const [loading, setLoading] = useState(true)
    const [page , setPage] = useState(1)
    

    const searchItemName = searchTerm.search


    const itemPackgeDatanew = useSelector(state => state.itemPackage)
    const {itemPackage} = itemPackgeDatanew
   
    const dataBook = async e => {
        const token = localStorage.getItem("accesToken")


        const data = await dispatch(itemStore({ token, searchItemName, page }))
           
            if(data.payload.items){
                setLoading(false)
            }else{
                setLoading(true)
            }
    }

    useEffect((e) =>{
        dataBook() 
    }, [page, searchItemName])

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchTerm({ search: event.target.elements.simpleSearch.value });
    };

    

    return(
        <>
            <Navbar />
            <div className="container mx-auto">
                {/* header */}
                <div className="w-200 h-300 flex justify-center mt-5 mb-10">
                    <div className="text-justify text-4xl font-sans">Selamat Datang Di Store Item</div>
                </div>
                {/* search */}
                <div className="flex flex-row center mb-4">
                    <div className="flex mt-2 mr-5 font-normal text-gray-700 dark:text-gray-400" > Cari Nama barang Anda</div>
                    <form className="flex flex-grow items-center" onSubmit={handleSearch}>   
                        <label for="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                name="simpleSearch"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search"
                                required
                            />
                        </div>
                        <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div>
                {/* body */}
                <div className="flex flex-wrap mb-5 justify-center">
                { //Check if message failed
                        !loading 
                        ? 
                        itemPackage.items.map(item => {
                           return(
                               <CardItem 
                                   item={item}
                                   key={item.id}
                              />
                           )
                       })
                        : <div> haduh </div>
                    }

                </div>
                {/* Pagination */}
                <div className="flex justify-center">
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px justify-center">
                            <li>
                            <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setPage(1)}>1</a>
                            </li>
                            <li>
                            <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"onClick={() => setPage(2)}>2</a>
                            </li>
                            <li>
                            <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setPage(3)}>3</a>
                            </li>
                            <li>
                            <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setPage(4)}>4</a>
                            </li>
                            <li>
                            <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => setPage(5)}>5</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>   
        </>
    )
}
