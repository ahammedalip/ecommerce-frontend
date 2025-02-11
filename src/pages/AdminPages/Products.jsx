

import React, { useState, useEffect } from "react";
import ListedProducts from "../../components/admin/ListedProducts";
import { uploadImageToFirebase } from "../../hooks/UseFirebaseImagUpload";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    CircularProgress
} from "@mui/material";
import axiosInstance from "../../axios/api";
import toast from "react-hot-toast";

export default function Products() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [refresh , setRefresh] = useState(false)

    const [productData, setProductData] = useState({
        name: "",
        quantity: "",
        description: "",
        image: null,
    });

    // // Fetch Products
    // const fetchProducts = async () => {
    //     setFetching(true);
    //     try {
    //         const response = await axiosInstance.get("/admin/products/getProducts");
    //         setProducts(response.data.products);
    //     } catch (err) {
    //         console.error("Error fetching products:", err);
    //         toast.error("Failed to load products");
    //     } finally {
    //         setFetching(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
    };

    // Validate Form
    const validateForm = () => {
        let newErrors = {};
        if (!productData.name.trim()) newErrors.name = "Product name is required";
        if (!productData.quantity || productData.quantity <= 0) newErrors.quantity = "Valid quantity is required";
        if (!productData.description.trim()) newErrors.description = "Description is required";
        if (!productData.image) newErrors.image = "Product image is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Submit (Send Data to Backend)
    const handleSubmit = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            // uploading image to firebase
            const imageUrl = await uploadImageToFirebase(productData.image);

            if (!imageUrl) throw new Error("Failed to upload image");

            const response = await axiosInstance.post("/admin/product/addProduct", {
                name: productData.name,
                quantity: productData.quantity,
                description: productData.description,
                imageUrl,
            });

            if (response.data) {
                toast.success("Product added successfully");
                setOpen(false);
                setProductData({ name: "", quantity: "", description: "", image: null });
                setRefresh(prev => !prev);
            }
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 mx-36 space-y-4">
            <div className="bg-gray-400 rounded-md w-full flex justify-between items-center p-3 shadow-md">
                <h1>Add a new product</h1>
                <button
                    className="bg-black rounded-3xl text-white p-2 px-3 hover:bg-gray-700"
                    onClick={() => setOpen(true)}
                >
                    Click here
                </button>
            </div>

            <ListedProducts refresh={refresh}/>

            <Dialog open={open} onClose={() => setOpen(false)} className="mb-2">
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent className="space-y-3">
                    <TextField
                        label="Product Name"
                        name="name"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Product Quantity"
                        name="quantity"
                        type="number"
                        fullWidth
                        inputProps={{ min: "1" }}
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        multiline
                        rows={3}
                        error={!!errors.description}
                        helperText={errors.description}
                        onChange={handleChange}
                    />
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : "Add Product"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

