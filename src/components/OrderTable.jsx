import {
  Table,
  Button,
  Space,
  Popconfirm,
  Tag,
} from "antd";

function OrderTable({
  orders,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (qty) => (
        <Tag color="blue">
          {qty}
        </Tag>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      render: (amount) =>
        `₹${amount}`,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() =>
              onEdit(record)
            }
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Order?"
            onConfirm={() =>
              onDelete(record.id)
            }
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
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