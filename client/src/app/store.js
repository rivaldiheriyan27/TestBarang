import { configureStore } from '@reduxjs/toolkit'
import itemScreenReducer from "../pages/itemHome/slice"
import detailItemScreenReducer from "../pages/detailItem/slice"


export const store = configureStore({
    reducer:{
        // // foodsPackage: foodScreenReducer
        itemPackage : itemScreenReducer,
        detailItemPackage : detailItemScreenReducer

    }
})