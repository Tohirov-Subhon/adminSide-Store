import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, editCategory, getCategory } from "../../api/productSlice";
import { URL } from "../../config/config";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Other = () => {

  let data = useSelector((store) => store.products.data)
  
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategory())
  },[])


  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };


  const [addName,setAddName] = useState('');
  const [addFile,setAddFile] = useState(null);

  const [editName,setEditName] = useState('');
  const [editFile,setEditFile] = useState(null);
  const [idx,setIdx] = useState(null);





  
  function addCateg() {
    const formdata = new FormData();
    formdata.append("categoryName", addName);
    if(addFile){
      formdata.append("categoryImage", addFile[0]);
    }

    dispatch(addCategory(formdata))
    setAddName('')
    setAddName(null)
    handleClose()
  }

  function editCateg() {
    const editFormdata = new FormData();
    editFormdata.append("categoryName", editName);
    editFormdata.append("id", idx);
    if(editFile){
      editFormdata.append("categoryImage", editFile[0]);
    }

    dispatch(editCategory(editFormdata))
    console.log(editFormdata)
    handleClose2()
  }




return (
  <>
  <div>

    <div className="flex justify-end mb-[50px] ">
    <Button variant="contained" onClick={handleClickOpen}> + Add</Button>

    </div>

    <div className="flex gap-[30px] flex-wrap ">

    {
      data.map((el) => (
        <div key={el.id} className="w-[200px] h-[170px] p-[20px_20px] flex justify-between mb-[50px] border-[1px] border-[gray] rounded-[5px] ">
          <div className=" ">
          <img className="w-[100px] h-[80px] mb-[15px] rounded-[5px] " src={URL + '/images/' + el.categoryImage} alt="" />
          <p>{el.categoryName}</p>
          </div>
          <div>
          <BorderColorIcon onClick={() => {setEditName(el.categoryName),setEditFile(el.categoryImage),setIdx(el.id),handleClickOpen2()}} sx={{cursor:"pointer",color:"#2563EB",display:"block",marginBottom:"25px"}}></BorderColorIcon>
          <div><DeleteIcon  onClick={() => dispatch(deleteCategory(el.id))} sx={{cursor:"pointer",color:"red"}}></DeleteIcon></div>
          </div>
        </div>
      ))
    }

    </div>

  </div>

  <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <input  className="w-[250px] h-[30px] border-[1.5px] rounded-[3px] pl-[10px] mb-[20px] block  " type="text" placeholder="Name" value={addName} onChange={(e) => setAddName(e.target.value)} />
            <input className="w-[250px] h-[30px] border-[1.5px] rounded-[3px] pl-[10px] mb-[20px] cursor-pointer " type="file" multiple placeholder="Name"  onChange={(e) => setAddFile(e.target.files)}  />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addCateg} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
  </React.Fragment>


  <React.Fragment>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <input  className="w-[250px] h-[30px] border-[1.5px] rounded-[3px] pl-[10px] mb-[20px] block " type="text" placeholder="Name" value={editName} onChange={(e) =>   setEditName(e.target.value)} />
            <input className="w-[250px] h-[30px] border-[1.5px] rounded-[3px] pl-[10px] mb-[20px] cursor-pointer " type="file" multiple placeholder="File"  onChange={(e) => setEditFile(e.target.files)}  />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Close</Button>
          <Button onClick={editCateg} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
  </React.Fragment>
  
  </>
)
};

export default Other;
