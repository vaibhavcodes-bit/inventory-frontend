import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Select,
  InputNumber,
} from "antd";

function OrderForm({
  customers,
  products,
  onSubmit,
}) {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    await onSubmit(values);

    form.resetFields();
  };

  return (
    <Card
      title="Create Order"
      style={{
        marginBottom: 24,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Customer"
              name="customer_id"
              rules={[
                {
                  required: true,
                  message: "Select customer",
                },
              ]}
            >
              <Select
                placeholder="Select Customer"
                options={customers.map(
                  (customer) => ({
                    value: customer.id,
                    label: customer.name,
                  })
                )}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Product"
              name="product_id"
              rules={[
                {
                  required: true,
                  message: "Select product",
                },
              ]}
            >
              <Select
                placeholder="Select Product"
                options={products.map(
                  (product) => ({
                    value: product.id,
                    label: `${product.name} (Stock: ${product.stock})`,
                  })
                )}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Quantity required",
                },
              ]}
            >
              <InputNumber
                min={1}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
              >
                Create Order
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default OrderForm;