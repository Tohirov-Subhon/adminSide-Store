import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { deleteProduct, getProducts } from '../../api/productSlice';
import { useDispatch, useSelector } from 'react-redux';

import {URL} from '../../config/config'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";


import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';


const Products = () => {


  let data = useSelector((store) => store.products.data)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  console.log(data)

  return <div>
    
    <div>
      <Link to='/addProduct'><button>+ Add</button></Link>
    </div>

    <div className="p-4">
      
        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200" sx={{backgroundColor:"gray"}}>
                <TableCell>Product</TableCell>
                <TableCell>Inventory</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 && data.map((el) => (
                <TableRow key={el.id} className="hover:bg-gray-100">
                  <TableCell sx={{display:'flex',gap:"15px"}} >
                   <img style={{width:"50px",height:"50px" }} src={URL+ "/images/" + el.images} alt="" />
                    <p>{el.productName}</p>
                  </TableCell>
                  <TableCell>{el.quantity > 0 ? el.quantity +  ' in Stock' : 'Out of Stock'}</TableCell>
                  <TableCell>{el.categoryName}</TableCell>
                  <TableCell>${el.price}</TableCell>
                  <TableCell >
                  <DeleteIcon sx={{cursor:"pointer",marginTop:"10px",color:"red"}} onClick={() => dispatch(deleteProduct(el.id))} />
                      <button >Edit</button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

    </div>
   
  </div>;
};

export default Products;
