import { createAsyncThunk } from '@reduxjs/toolkit'

import {axiosRequest} from '../axiosRequest' 



import axios from 'axios'



export const getProducts = createAsyncThunk('products/getProducts',async () => {
    try {
        let {data} = await axiosRequest.get('Product/get-products')
        return data.data.products
    } catch (error) {
        console.log(error)
    }
})

    export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, {dispatch} ) => {
    try {
        await axiosRequest.delete(`Product/delete-product?id=${id}`)
        dispatch(getProducts())
    } catch (error) {
        console.log(error)
    }
})