import React, { useState, useRef, useEffect } from "react"
import {Box,Button,TextField,Typography,Select,MenuItem,FormControlLabel,Switch,Chip,IconButton,Grid,Paper,ToggleButtonGroup,ToggleButton,} from "@mui/material"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch, useSelector } from "react-redux"
import { addColorr, addProductt, getBrand, getCategory, getColor, getSubCateg } from "../../api/productSlice"
import { store } from "../../store/store"


// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from "react-router-dom"




function addProduct() {
  const [tags, setTags] = useState(["T-Shirt", "Men Clothes", "Summer Collection"])
  const [newTag, setNewTag] = useState("")
  const [formats, setFormats] = useState(() => [])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [selectedColor, setSelectedColor] = useState(null)
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
    setSelectedSubCategory("")
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5)) // Limit to 5 images
  }

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5)) // Limit to 5 images
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


  const [addName,setAddName] = useState('')
  const [addCode,setAddCode] = useState('')

  // const [addQuantity,setAddQuantity] = useState('')
  const [addDescription,setAddDescription] = useState('')
  const [addPrice,setAddPrice] = useState('')
  const [addCateg,setAddCateg] = useState('')
  const [addSubCateg,setAddSubCateg] = useState(null)
  const [addBrand,setAddBrand] = useState(null)
  const [addCount,setAddCount] = useState('')
  const [addDiscount,setAddDiscount] = useState('')

  const [addSize,setAddSize] = useState('')
  const [addWeight,setAddWeight] = useState('')
  const [color,setColor] = useState(null)
  const [addImage,setAddImage] = useState(null)
  const [check,setCheck] = useState(false)


  let navigate = useNavigate()

  function add() {
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
    if(addImage){
      for(let i = 0; i < addImage.length; i++) {
        formdata.append('Images', addImage[i])
      }
    }
    dispatch(addProductt(formdata))
    navigate('/products')
    
    console.log(formdata)

  }

  

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
          <Button variant="contained" color="primary" onClick={add}>
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
                  border: selectedColor === color.id ? "2px solid black" : "none",
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


          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <Paper
            variant="outlined"
            
            sx={{
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              mb: 2,
            }}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Typography>Click to upload or drag and drop</Typography>
            <Typography variant="caption" color="textSecondary">
              PNG, JPG, GIF up to 10MB (max.5)
            </Typography>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setAddImage(e.target.files)}
              // accept="image/*"
              multiple
              style={{ display: "none" }}
            />
          </Paper>
          {images.map((image, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box
                component="img"
                src={image.preview}
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  mr: 1,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2">{image.file.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {image.file.type}
                </Typography>
              </Box>
              <IconButton onClick={() => handleRemoveImage(index)} size="small">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
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

export default addProduct