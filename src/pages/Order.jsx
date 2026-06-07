import { useEffect, useState } from "react";
import { Typography, message } from "antd";

import api from "../services/api";

import OrderForm from "../components/OrderForm";
import OrderTable from "../components/OrderTable";
import AppLayout from "../components/Layout";

const { Title, Text } = Typography;

function Orders() {
  const [orders, setOrders] =
    useState([]);

  const [editingOrder,
    setEditingOrder] =
    useState(null);

  // ==========================
  // GET ORDERS
  // ==========================
  const fetchOrders = async () => {
    try {
      const response =
        await api.get("/orders/");

      setOrders(response.data);
    } catch (error) {
      console.log(error);

      message.error(
        "Failed to load orders"
      );
    }
  };

  // ==========================
  // CREATE / UPDATE
  // ==========================
  const handleSubmitOrder =
    async (values) => {
      try {
        if (editingOrder) {
          await api.put(
            `/orders/${editingOrder.id}`,
            {
              customer_id:
                values.customer_id,
              quantity:
                values.quantity,
            }
          );

          message.success(
            "Order updated successfully"
          );

          setEditingOrder(null);
        } else {
          await api.post(
            "/orders/",
            values
          );

          message.success(
            "Order created successfully"
          );
        }

        fetchOrders();
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

  // ==========================
  // EDIT
  // ==========================
  const handleEdit = (order) => {
    setEditingOrder(order);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // DELETE
  // ==========================
  const handleDelete =
    async (orderId) => {
      try {
        await api.delete(
          `/orders/${orderId}`
        );

        message.success(
          "Order deleted successfully"
        );

        fetchOrders();
      } catch (error) {
        console.log(error);

        message.error(
          "Delete failed"
        );
      }
    };

  useEffect(() => {
    fetchOrders();
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
        Manage orders and
        inventory tracking.
      </Text>

      <OrderForm
        onSubmit={
          handleSubmitOrder
        }
        editingOrder={
          editingOrder
        }
      />

      <OrderTable
        orders={orders}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AppLayout>
  );
}

export default Orders;