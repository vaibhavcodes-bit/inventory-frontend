import { useEffect, useState } from "react";
import { Typography, message } from "antd";

import api from "../services/api";

import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";
import AppLayout from "../components/Layout";

const { Title, Text } = Typography;

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [editingCustomer, setEditingCustomer] =
    useState(null);

  // ==========================
  // GET CUSTOMERS
  // ==========================
  const fetchCustomers = async () => {
    try {
      const response =
        await api.get("/customers/");

      setCustomers(response.data);
    } catch (error) {
      console.log(error);

      message.error(
        "Failed to load customers"
      );
    }
  };

  // ==========================
  // CREATE / UPDATE CUSTOMER
  // ==========================
  const handleSubmitCustomer =
    async (values) => {
      try {
        if (editingCustomer) {
          await api.put(
            `/customers/${editingCustomer.id}`,
            values
          );

          message.success(
            "Customer updated successfully"
          );

          setEditingCustomer(null);
        } else {
          await api.post(
            "/customers/",
            values
          );

          message.success(
            "Customer added successfully"
          );
        }

        fetchCustomers();
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
  const handleEdit = (
    customer
  ) => {
    setEditingCustomer(customer);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // DELETE
  // ==========================
  const handleDelete =
    async (customerId) => {
      try {
        await api.delete(
          `/customers/${customerId}`
        );

        message.success(
          "Customer deleted successfully"
        );

        fetchCustomers();
      } catch (error) {
        console.log(error);

        message.error(
          "Delete failed"
        );
      }
    };

  // ==========================
  // INITIAL LOAD
  // ==========================
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <AppLayout>
      <Title level={2}>
        Customer Management
      </Title>

      <Text
        type="secondary"
        style={{
          display: "block",
          marginBottom: "20px",
        }}
      >
        Manage customer records,
        emails and addresses.
      </Text>

      <CustomerForm
        onSubmit={
          handleSubmitCustomer
        }
        editingCustomer={
          editingCustomer
        }
      />

      <CustomerTable
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AppLayout>
  );
}

export default Customers;