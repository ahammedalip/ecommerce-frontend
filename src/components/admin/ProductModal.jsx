import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField } from "@mui/material";
import axiosInstance from "../../axios/api";
import toast from "react-hot-toast";

export default function ProductModal({ open, handleClose, product, mode, updateProductList }) {
    const [formData, setFormData] = useState({ name: "", quantity: "", imageUrl: "", description: "" });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                quantity: product.quantity || "",
                imageUrl: product.imageUrl || "",
                description: product.description || "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await axiosInstance.put(`/admin/product/editProduct/${product._id}`, formData);
            toast.success("Product updated successfully");
            updateProductList(response.data.updatedProduct);
            handleClose();
        } catch (err) {
            console.error("Error updating product:", err);
            toast.error("Failed to update product");
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 450,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                {/* Product Image */}
                <img
                    src={formData.imageUrl}
                    alt="Product"
                    className="w-full rounded-md"
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                />

                {/* Modal Title */}
                <Typography variant="h6" gutterBottom className="mt-4">
                    {mode === "view" ? "View Product" : "Edit Product"}
                </Typography>

                {/* Name & Quantity in One Row */}
                <div className="flex gap-4">
                    <TextField
                        label="Product Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled={mode === "view"}
                    />

                    <TextField
                        label="Quantity"
                        name="quantity"
                        value={formData.quantity}
                        type="number"
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled={mode === "view"}
                    />
                </div>

                {/* Description Field */}
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    disabled={mode === "view"}
                />

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-4">
                    {mode === "edit" && (
                        <button
                            className="bg-gray-400 rounded-md p-2 px-4 transition duration-300 hover:bg-gray-900 hover:text-white"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    )}
                    <button
                        className="bg-gray-400 rounded-md p-2 px-4 transition duration-300 hover:bg-gray-900 hover:text-white"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </Box>
        </Modal>
    );
}
