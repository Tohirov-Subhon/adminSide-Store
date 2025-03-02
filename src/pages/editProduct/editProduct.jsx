import React, { useState, useRef, useEffect } from "react"
import {Box,Button,TextField,Typography,Select,MenuItem,FormControlLabel,Switch,Chip,IconButton,Grid,ToggleButtonGroup,ToggleButton,} from "@mui/material"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch, useSelector } from "react-redux"
import { addColorr, addProductt, editProductt, getBrand, getCategory, getColor, getProductById, getSubCateg } from "../../api/productSlice"
import { store } from "../../store/store"



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate, useParams } from "react-router-dom"




function EditProduct() {
  const [tags, setTags] = useState(["T-Shirt", "Men Clothes", "Summer Collection"])
  const [newTag, setNewTag] = useState("")
  const [formats, setFormats] = useState(() => [])


  const handleFormat = (event, newFormats) => {
    setFormats(newFormats)
  }

  const handleAddTag = () => {
    if (newTag) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  

  


  let dispatch = useDispatch()

  let colors = useSelector((store) => store.products.color)
  let categ = useSelector((store) => store.products.data)
  let subCateg = useSelector((store) => store.products.subCategory)
  let brands = useSelector((store) => store.products.brand)



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    dispatch(getColor())
  },[])


  useEffect(() => {
    dispatch(getCategory())
    dispatch(getSubCateg())
    dispatch(getBrand())
  },[])


  const [addColor,setAddColor] = useState()


  let data = useSelector((store) => store.products.productById)

  console.log(data)

  const [addName,setAddName] = useState(data.productName)
  const [addCode,setAddCode] = useState('')

  const [addDescription,setAddDescription] = useState(data.description)
  const [addPrice,setAddPrice] = useState(data.price)
  const [addCateg,setAddCateg] = useState(data.categoryName)
  const [addSubCateg,setAddSubCateg] = useState(null)
  const [addBrand,setAddBrand] = useState(null)
  const [addCount,setAddCount] = useState(data.quantity)
  const [addDiscount,setAddDiscount] = useState(data.discountPrice)

  const [addSize,setAddSize] = useState(data.size)
  const [addWeight,setAddWeight] = useState(data.weight)
  const [color,setColor] = useState(null)
  const [check,setCheck] = useState(false)

  const [idx,setIdx] = useState(data.id)

  let navigate = useNavigate()

  function edit() {
    let formdata = new FormData()
    formdata.append('ProductName', addName)
    formdata.append('Code', addCode)
    formdata.append('Description', addDescription)
    formdata.append('Price', addPrice)
    formdata.append('Category', addCateg)
    formdata.append('SubCategoryId', addSubCateg)
    formdata.append('BrandId', addBrand)
    formdata.append('Quantity', addCount)
    formdata.append('DiscountPrice', addDiscount)
    formdata.append('HasDiscount ', check)
    formdata.append('Size', addSize)
    formdata.append('Weight', addWeight)
    formdata.append('ColorId', color)
    formdata.append('Id', idx)

    dispatch(editProductt(formdata))
    navigate('/products')
    
    console.log(formdata)

  }


  let {id} = useParams()

  useEffect(() => {
    dispatch(getProductById(id))
  },[id])

  useEffect(()=> {
    if(data) {
      if (data) {
        setAddName(data.productName);
        setAddDescription(data.description);
        setAddPrice(data.price);
        setAddCateg(data.categoryName);
        setAddSubCateg(data.subCategoryId);
        setAddBrand(data.brandId);
        setAddCount(data.quantity);
        setAddDiscount(data.discountPrice);
        setAddSize(data.size);
        setAddWeight(data.weight);
        setColor(data.colorId);
        setAddCode(data.code)
        setIdx(data.id);
      }
    }
  },[data])

  console.log(data)

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Products / Add new</Typography>
        </Box>
        <Box>
          <Link to='/products'><Button variant="outlined" sx={{ mr: 1 }}>
            Cancel
          </Button></Link>
          <Button variant="contained" color="primary" onClick={edit}>
            Save
          </Button>
        </Box>
      </Box>


      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Information
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField value={addName} onChange={(e) => setAddName(e.target.value)} label="Product name" variant="outlined" fullWidth />
            <TextField value={addCode} onChange={(e) => setAddCode(e.target.value)} label="Code" variant="outlined" fullWidth />
          </Box>

          <Box sx={{ mb: 2 }}>
            <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting">
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
              <ToggleButton value="bullet" aria-label="bullet list">
                <FormatListBulletedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <TextField value={addDescription} onChange={(e) => setAddDescription(e.target.value)} label="Description" multiline rows={4} variant="outlined" fullWidth sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Select fullWidth value={addCateg} onChange={(e) => setAddCateg(e.target.value)} displayEmpty variant="outlined">
              <MenuItem value="" disabled>
                Categories
              </MenuItem>
              {categ.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
            <Select
              fullWidth
              value={addSubCateg}
              onChange={(e) => setAddSubCateg(e.target.value)}
              displayEmpty
              variant="outlined"
              
            >
              <MenuItem value="" disabled>
                Sub Categories
              </MenuItem>
              {subCateg.map((subCat) => (
                  <MenuItem key={subCat.id} value={subCat.id} >
                    {subCat.subCategoryName}
                  </MenuItem>
                ))}
            </Select>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Select value={addBrand} onChange={(e) => setAddBrand(e.target.value)} fullWidth displayEmpty variant="outlined">
              <MenuItem value="" disabled>
                Brands
              </MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.brandName}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Typography variant="h6" gutterBottom>
            Price
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField value={addPrice} onChange={(e) => setAddPrice(e.target.value)} label="Product price" type="number" variant="outlined" fullWidth />
            <TextField value={addDiscount} onChange={(e) => setAddDiscount(e.target.value)} label="Discount" type="number" variant="outlined" fullWidth />
            <TextField value={addCount} onChange={(e) => setAddCount(e.target.value)} label="Count" type="number" variant="outlined" fullWidth />
          </Box>

          {/* <FormControlLabel control={<Switch />} label="Add tax for this product" sx={{ mb: 2 }} /> */}

          <Typography variant="h6" gutterBottom>
            Different Options
          </Typography>
          <FormControlLabel control={<Switch value={check} onChange={() => setCheck(true)} />}   label="This product has multiple options" sx={{ mb: 2 }} />


          <Typography variant="subtitle1" gutterBottom>
            Options
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Size</Typography>
            <input value={addSize} onChange={(e) => setAddSize(e.target.value)} type="text" className="w-[220px] h-[35px] border-[1px] border-[gray] rounded-[3px] mt-[8px] pl-[10px] " placeholder="Size" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Weight</Typography>
            <input value={addWeight} onChange={(e) => setAddWeight(e.target.value)} type="text" className="w-[220px] h-[35px] border-[1px] border-[gray] rounded-[3px] mt-[8px] pl-[10px] " placeholder="Weight" />
            
          </Box>
          
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Colour
          </Typography>
          <Box sx={{ display: "flex",flexWrap:'wrap', gap: 1, mb: 2 }}>
            {colors.map((color) => (
              <Box
                key={color.id}
                sx={{
                  width: 25,
                  height: 25,
                  backgroundColor: color.colorName,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: data.color ===  color.colorName ? "2px solid black" : "none",
                }}
                onClick={() => setColor(color.id)}
              />
            ))} 
          </Box>
          <Button variant="outlined" sx={{marginBottom:"20px"}} onClick={handleClickOpen}>Outlined</Button>

          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              placeholder="Tags name"
              variant="outlined"
              size="small"
              fullWidth
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <IconButton onClick={handleAddTag}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
            ))}
          </Box>


          
         
          
        </Grid>
      </Grid>

      <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Color"}
        </DialogTitle>
        <DialogContent>
          <input value={addColor} onChange={(e) => setAddColor(e.target.value)} type="text" className="w-[250px] h-[30px] border-[1px] border-[gray] rounded-[3px] pl-[10px] " placeholder="Color Name" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {dispatch(addColorr(addColor)),handleClose()}} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </Box>
  )
}

export default EditProduct