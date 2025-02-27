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





export const getCategory = createAsyncThunk('products/getCategory', async () => {
    try {
        let {data} = await axiosRequest.get('/Category/get-categories')
        return data.data
    } catch (error) {
        console.log(error)
    }
} )


export const deleteCategory = createAsyncThunk('products/deleteCategory', async (id,{dispatch}) => {
    try {
        await axiosRequest.delete(`/Category/delete-category?id=${id}`)
        dispatch(getCategory())
    } catch (error) {
        console.log(error)
    }
})



export const addCategory = createAsyncThunk('products/addCategory', async (formdata,{dispatch}) => {
    try {
        await axiosRequest.post(`/Category/add-category`, formdata)
        dispatch(getCategory())
    } catch (error) {
        console.log(error)
    }
})


export const editCategory = createAsyncThunk('products/editCategory', async (formdata,{dispatch}) => {
    try {
        await axiosRequest.put('/Category/update-category',formdata)
        dispatch(getCategory())
    } catch (error) {
        console.log(error)
    }
})





export const getColor = createAsyncThunk('products/getColor', async () => {
    try {
        let {data} = await axiosRequest.get('/Color/get-colors')
        return data.data
    } catch (error) {
        console.log(error)
    }
})


export const getSubCateg = createAsyncThunk('products/getSubCateg', async () => {
    try {
        let {data} = await axiosRequest.get('/SubCategory/get-sub-category')
        return data.data
    } catch (error) {
        console.log(error)
    }
})


export const getBrand = createAsyncThunk('products/getBrand', async () => {
    try {
        let {data} = await axiosRequest.get('/Brand/get-brands')
        return data.data
    } catch (error) {
        console.log(error)
    }
})