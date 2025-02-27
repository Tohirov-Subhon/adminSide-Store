"use client"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Chip,
  IconButton,
  Grid,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch, useSelector } from "react-redux"
import { getBrand, getCategory, getColor, getSubCateg } from "../../api/productSlice"
import { store } from "../../store/store"


const brands = [
  { id: 1, name: "Nike" },
  { id: 2, name: "Adidas" },
  { id: 3, name: "Puma" },
  { id: 4, name: "Reebok" },
]

const categories = [
  { id: 1, name: "Clothing" },
  { id: 2, name: "Shoes" },
  { id: 3, name: "Accessories" },
]

const subCategories = [
  { id: 1, categoryId: 1, name: "T-Shirts" },
  { id: 2, categoryId: 1, name: "Pants" },
  { id: 3, categoryId: 1, name: "Jackets" },
  { id: 4, categoryId: 2, name: "Sneakers" },
  { id: 5, categoryId: 2, name: "Boots" },
  { id: 6, categoryId: 3, name: "Bags" },
  { id: 7, categoryId: 3, name: "Hats" },
]

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

  useEffect(() => {
    dispatch(getColor())
  },[])


  useEffect(() => {
    dispatch(getCategory())
    dispatch(getSubCateg())
    dispatch(getBrand())
  },[])

  

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
          <Button variant="outlined" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary">
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
            <TextField label="Product name" variant="outlined" fullWidth />
            <TextField label="Code" variant="outlined" fullWidth />
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
          <TextField label="Description" multiline rows={4} variant="outlined" fullWidth sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Select fullWidth value={selectedCategory} onChange={handleCategoryChange} displayEmpty variant="outlined">
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
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              displayEmpty
              variant="outlined"
              
            >
              <MenuItem value="" disabled>
                Sub Categories
              </MenuItem>
              {subCateg.map((subCat) => (
                  <MenuItem key={subCat.id} value={subCat.id}>
                    {subCat.subCategoryName}
                  </MenuItem>
                ))}
            </Select>
          </Box>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Select fullWidth displayEmpty variant="outlined">
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
            <TextField label="Product price" type="number" variant="outlined" fullWidth />
            <TextField label="Discount" type="number" variant="outlined" fullWidth />
            <TextField label="Count" type="number" variant="outlined" fullWidth />
          </Box>

          <FormControlLabel control={<Switch />} label="Add tax for this product" sx={{ mb: 2 }} />

          <Typography variant="h6" gutterBottom>
            Different Options
          </Typography>
          <FormControlLabel control={<Switch />} label="This product has multiple options" sx={{ mb: 2 }} />


          <Typography variant="subtitle1" gutterBottom>
            Options
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Size</Typography>
            <input type="text" className="w-[220px] h-[35px] border-[1px] border-[gray] rounded-[3px] mt-[8px] pl-[10px] " placeholder="Size" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Weight</Typography>
            <input type="text" className="w-[220px] h-[35px] border-[1px] border-[gray] rounded-[3px] mt-[8px] pl-[10px] " placeholder="Weight" />
            
          </Box>
          
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Colour
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {colors.map((color) => (
              <Box
                key={color.id}
                sx={{
                  width: 40,
                  height: 25,
                  backgroundColor: color.colorName,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: selectedColor === color.id ? "2px solid black" : "none",
                }}
                onClick={() => setSelectedColor(color.id)}
              />
            ))}
          </Box>

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
              onChange={handleImageUpload}
              accept="image/*"
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
    </Box>
  )
}

export default addProduct