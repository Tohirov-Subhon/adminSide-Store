import { createSlice } from '@reduxjs/toolkit'
import { getProducts } from '../../api/productSlice'



const  productsSlice = createSlice({
    name: 'products',

    initialState: {
        data: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.fulfilled,(state,action) => {
            state.data = action.payload
        })
    }
})

export default productsSlice.reducer