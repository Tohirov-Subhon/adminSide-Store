import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { deleteProduct, delImageProduct, getProducts } from '../../api/productSlice';
import { useDispatch, useSelector } from 'react-redux';

import {URL} from '../../config/config'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,TablePagination, Button } from "@mui/material";
// import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, TablePagination } from "@mui/material";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
// import EditProduct from '../editProduct/editProduct';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';

const Products = () => {


  let data = useSelector((store) => store.products.data)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  }, [])


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));
    setPage(0);
  };

  // console.log(data)




  return <div>
    
    <div className='flex justify-end'>
      <Link to='/addProduct'><Button variant="contained">+ Add</Button></Link>

    </div>

    <div className="p-4">
      
        {/* <TableContainer component={Paper} className="shadow-lg rounded-lg">
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
                   <img style={{width:"50px",height:"50px",borderRadius:"5px" }} src={`https://store-api.softclub.tj/images/${el.image}`} alt="" />
                    <p className='mt-[13px]'>{el.productName}</p>
                  </TableCell>
                  <TableCell >
                    <span className={`${el.quantity > 0 ? 'bg-[green]' : 'bg-[red]'} p-[5px] text-white rounded-[5px] `}>{el.quantity > 0 ? el.quantity +  ' in Stock' : 'Out of Stock'}</span>
                  </TableCell>
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
        </TableContainer> */}



<TableContainer component={Paper} sx={{width:'auto',marginLeft:"-20px"}} className=" shadow-lg rounded-lg">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-200" sx={{ backgroundColor: "gray" }}>
            <TableCell>Product</TableCell>
            <TableCell>Inventory</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((el) => (
              <TableRow key={el.id} className="hover:bg-[gray]">
              <TableCell sx={{ display: "flex", gap: "15px" }}>
                <img
                  style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                  src={`https://store-api.softclub.tj/images/${el.image}`}
                  alt=""
                />
                <p className="mt-[13px]">{el.productName}</p>
              </TableCell>
              <TableCell>
                <span className={`${el.quantity > 0 ? "bg-[green]" : "bg-[red]"} p-[5px] text-white rounded-[5px]`}>
                  {el.quantity > 0 ? `${el.quantity} in Stock` : "Out of Stock"}
                </span>
              </TableCell>
              <TableCell>{el.categoryName}</TableCell>
              <TableCell>${el.price}</TableCell>
              <TableCell>
                <Link to={`/editProduct/${el.id}`}>
                <BorderColorIcon
                  sx={{ cursor: "pointer", marginTop: "10px", color: "#1E5EFF",marginRight:"0px" }}
                >
                  
                </BorderColorIcon>
                </Link>
                <DeleteIcon
                  sx={{ cursor: "pointer", marginTop: "10px", color: "red" }}
                  onClick={() => dispatch(deleteProduct(el.id))}
                />
                <FolderDeleteIcon onClick={() => console.log(el)} sx={{marginTop:"10px",cursor:"pointer"}} />
                  {/* {console.log(el.images.id)} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>

    </div>
   
  </div>;
};

export default Products;
