import {
  Table,
  Button,
  Space,
  Popconfirm,
} from "antd";

function CustomerTable({
  customers,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
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
            title="Delete Customer?"
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
      dataSource={customers}
      pagination={{
        pageSize: 5,
      }}
    />
  );
}

export default CustomerTable;