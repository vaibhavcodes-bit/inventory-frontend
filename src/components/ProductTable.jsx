import {
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
} from "antd";

function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `₹${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      render: (stock) => (
        <Tag color={stock > 10 ? "green" : "red"}>
          {stock}
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Product"
            description="Are you sure?"
            onConfirm={() =>
              onDelete(record.id)
            }
            okText="Yes"
            cancelText="No"
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
      dataSource={products}
      pagination={{
        pageSize: 5,
      }}
    />
  );
}

export default ProductTable;