import { useEffect, useState } from "react";
import { Typography, message } from "antd";

import api from "../services/api";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import AppLayout from "../components/Layout";

const { Title, Text } = Typography;

function Products() {
  const [products, setProducts] = useState([]);

  const [editingProduct, setEditingProduct] =
    useState(null);

  // =====================
  // GET PRODUCTS
  // =====================
  const fetchProducts = async () => {
    try {
      const response =
        await api.get("/products/");

      setProducts(response.data);
    } catch (error) {
      console.log(error);

      message.error(
        "Failed to load products"
      );
    }
  };

  // =====================
  // CREATE / UPDATE
  // =====================
  const handleSubmitProduct =
    async (values) => {
      try {
        // UPDATE
        if (editingProduct) {
          await api.put(
            `/products/${editingProduct.id}`,
            values
          );

          message.success(
            "Product updated successfully"
          );

          setEditingProduct(null);
        }

        // CREATE
        else {
          await api.post(
            "/products/",
            values
          );

          message.success(
            "Product added successfully"
          );
        }

        fetchProducts();
      } catch (error) {
        console.log(error);

        if (
          error.response?.data?.detail
        ) {
          message.error(
            error.response.data.detail
          );
        } else {
          message.error(
            "Operation failed"
          );
        }
      }
    };

  // =====================
  // EDIT
  // =====================
  const handleEdit = (product) => {
    setEditingProduct(product);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================
  // DELETE
  // =====================
  const handleDelete =
    async (productId) => {
      try {
        await api.delete(
          `/products/${productId}`
        );

        message.success(
          "Product deleted successfully"
        );

        fetchProducts();
      } catch (error) {
        console.log(error);

        message.error(
          "Delete failed"
        );
      }
    };

  // =====================
  // INITIAL LOAD
  // =====================
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AppLayout>
      <Title level={2}>
        Products Management
      </Title>

      <Text
        type="secondary"
        style={{
          display: "block",
          marginBottom: "20px",
        }}
      >
        Manage product inventory,
        pricing and stock.
      </Text>

      <ProductForm
        onSubmit={
          handleSubmitProduct
        }
        editingProduct={
          editingProduct
        }
      />

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AppLayout>
  );
}

export default Products;