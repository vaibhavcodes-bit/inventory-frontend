import {
  Table,
  Button,
  Space,
} from "antd";

function OrderTable({
  orders,
  customers,
  products,
}) {
  const getCustomerName = (id) => {
    const customer = customers.find(
      (c) => c.id === id
    );

    return customer?.name || "Unknown";
  };

  const getProductName = (id) => {
    const product = products.find(
      (p) => p.id === id
    );

    return product?.name || "Unknown";
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
    },
    {
      title: "Customer",
      render: (_, record) =>
        getCustomerName(
          record.customer_id
        ),
    },
    {
      title: "Product",
      render: (_, record) =>
        getProductName(
          record.product_id
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      render: (amount) =>
        `₹${amount}`,
    },
    {
      title: "Actions",
      render: () => (
        <Space>
          <Button type="primary">
            Edit
          </Button>

          <Button danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={orders}
      pagination={{
        pageSize: 5,
      }}
    />
  );
}

export default OrderTable;