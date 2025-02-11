
// import React, { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, CircularProgress } from "@mui/material";
// import { MdEdit, MdDeleteForever } from "react-icons/md";
// import { FaRegEye } from "react-icons/fa";
// import axiosInstance from "../../axios/api";
// import toast from "react-hot-toast";
// import ProductModal from "./ProductModal";

// export default function ListedProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalMode, setModalMode] = useState("view");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axiosInstance.get("/admin/products/getProducts");
//         setProducts(response.data.products);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError("Failed to fetch products");
//         toast.error("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleView = (product) => {
//     setSelectedProduct(product);
//     setModalMode("view");
//     setModalOpen(true);
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setModalMode("edit");
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axiosInstance.delete(`/admin/product/deleteProduct/${id}`);
//       setProducts(products.filter((product) => product._id !== id));
//       toast.success("Product deleted successfully");
//     } catch (err) {
//       console.error("Error deleting product:", err);
//       toast.error("Failed to delete product");
//     }
//   };

//   const updateProductList = (updatedProduct) => {
//     setProducts(products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)));
//   };

//   return (
    
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h5" fontWeight="bold" gutterBottom>
//         Listed Products
//       </Typography>

//       {loading ? (
//         <div className="flex justify-center p-4">
//           <CircularProgress />
//         </div>
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow style={{ backgroundColor: "#f5f5f5" }}>
//                 <TableCell><strong>Sl No</strong></TableCell>
//                 <TableCell><strong>Name</strong></TableCell>
//                 <TableCell><strong>Image</strong></TableCell>
//                 <TableCell><strong>Quantity</strong></TableCell>
//                 <TableCell><strong>Actions</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {products.length > 0 ? (
//                 products.map((product, index) => (
//                   <TableRow key={product._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>
//                       <img src={product.imageUrl} alt={product.name} style={{ width: 50, height: 50, borderRadius: 5 }} />
//                     </TableCell>
//                     <TableCell>{product.quantity}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleView(product)}>
//                         <FaRegEye color="black" />
//                       </IconButton>
//                       <IconButton color="primary" onClick={() => handleEdit(product)}>
//                         <MdEdit />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDelete(product._id)}>
//                         <MdDeleteForever />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No products found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <ProductModal
//         open={modalOpen}
//         handleClose={() => setModalOpen(false)}
//         product={selectedProduct}
//         mode={modalMode}
//         updateProductList={updateProductList}
//       />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, CircularProgress, TablePagination } from "@mui/material";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import axiosInstance from "../../axios/api";
import toast from "react-hot-toast";
import ProductModal from "./ProductModal";

export default function ListedProducts({refresh}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set default rows per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/admin/products/getProducts");
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  const handleView = (product) => {
    setSelectedProduct(product);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axiosInstance.delete(`/admin/product/deleteProduct/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    }
  };

  const updateProductList = (updatedProduct) => {
    setProducts(products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)));
  };

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Listed Products
      </Typography>

      {loading ? (
        <div className="flex justify-center p-4">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><strong>Sl No</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell><strong>Quantity</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length > 0 ? (
                  products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                    <TableRow key={product._id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <img src={product.imageUrl} alt={product.name} style={{ width: 50, height: 50, borderRadius: 5 }} />
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleView(product)}>
                          <FaRegEye color="black" />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEdit(product)}>
                          <MdEdit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(product._id)}>
                          <MdDeleteForever />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Controls */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      <ProductModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        product={selectedProduct}
        mode={modalMode}
        updateProductList={updateProductList}
      />
    </div>
  );
}
