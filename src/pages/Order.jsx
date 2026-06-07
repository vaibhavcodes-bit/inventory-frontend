import { useEffect, useState } from "react";
import { Typography, message } from "antd";

import api from "../services/api";

import AppLayout from "../components/Layout";
import OrderForm from "../components/OrderForm";
import OrderTable from "../components/OrderTable";

const { Title, Text } = Typography;

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const [ordersRes, customersRes, productsRes] =
        await Promise.all([
          api.get("/orders/"),
          api.get("/customers/"),
          api.get("/products/"),
        ]);

      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.log(error);
      message.error("Failed to load data");
    }
  };

  const handleCreateOrder = async (values) => {
    try {
      await api.post("/orders/", values);

      message.success("Order created successfully");

      fetchData();
    } catch (error) {
      console.log(error);

      if (error.response?.data?.detail) {
        message.error(error.response.data.detail);
      } else {
        message.error("Failed to create order");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppLayout>
      <Title level={2}>
        Order Management
      </Title>

      <Text
        type="secondary"
        style={{
          display: "block",
          marginBottom: 20,
        }}
      >
        Manage orders and inventory tracking.
      </Text>

      <OrderForm
        customers={customers}
        products={products}
        onSubmit={handleCreateOrder}
      />

      <OrderTable
        orders={orders}
        customers={customers}
        products={products}
      />
    </AppLayout>
  );
}

export default Orders;