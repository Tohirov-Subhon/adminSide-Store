
import React, { useState } from "react";
import { TextField, Button, Switch, FormControlLabel, Chip, Select, MenuItem } from "@mui/material";

export const AddProduct = () => {

    const [product, setProduct] = useState({
        productName: "",
        description: "",
        price: "",
        discountPrice: "",
        hasDiscount: false,
        color: "",
        tags: [],
        images: [],
      });
      const [tagInput, setTagInput] = useState("");
    
      const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
      };
    
      const handleTagAdd = () => {
        if (tagInput) {
          setProduct({ ...product, tags: [...product.tags, tagInput] });
          setTagInput("");
        }
      };

  return (
    <div>


<div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <TextField label="Product Name" name="productName" value={product.productName} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Description" name="description" value={product.description} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Price" name="price" value={product.price} onChange={handleChange} fullWidth margin="normal" type="number" />
        <TextField label="Discount Price" name="discountPrice" value={product.discountPrice} onChange={handleChange} fullWidth margin="normal" type="number" />
      </div>
      <FormControlLabel control={<Switch checked={product.hasDiscount} onChange={() => setProduct({ ...product, hasDiscount: !product.hasDiscount })} />} label="Has Discount" />
      <Select value={product.color} onChange={(e) => setProduct({ ...product, color: e.target.value })} displayEmpty fullWidth>
        <MenuItem value="">Select Color</MenuItem>
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
        <MenuItem value="black">Black</MenuItem>
      </Select>
      <div className="mt-4">
        <TextField label="Add Tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} fullWidth margin="normal" />
        <Button onClick={handleTagAdd} variant="contained">Add Tag</Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {product.tags.map((tag, index) => (
          <Chip key={index} label={tag} onDelete={() => setProduct({ ...product, tags: product.tags.filter((t) => t !== tag) })} />
        ))}
      </div>
      <Button variant="contained" color="primary" className="mt-4">Save Product</Button>
    </div>


    </div>
  )
}
