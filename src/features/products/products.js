import { createSlice } from '@reduxjs/toolkit'
import { getBrand, getCategory, getColor, getProductById, getProducts, getSubCateg } from '../../api/productSlice'
import { colors } from '@mui/material'



const  productsSlice = createSlice({
    name: 'products',

    initialState: {
        data: [],
        color:[],
        brand:[],
        subCategory:[],
        productById:[]
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.fulfilled,(state,action) => {
            state.data = action.payload
        })
        .addCase(getCategory.fulfilled,(state,action) => {
            state.data = action.payload
        })
        .addCase(getColor.fulfilled,(state,action) => {
            state.color = action.payload
        })
        .addCase(getSubCateg.fulfilled,(state,action) => {
            state.subCategory = action.payload
        })
        .addCase(getBrand.fulfilled,(state,action) => {
            state.brand = action.payload
        })
        .addCase(getProductById.fulfilled,(state,action) => {
            state.productById = action.payload
        })
    }
})

export default productsSlice.reducer