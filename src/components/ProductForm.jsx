import {
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
} from "antd";
import { useEffect } from "react";

function ProductForm({
  onSubmit,
  editingProduct,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue(editingProduct);
    }
  }, [editingProduct, form]);

  const handleFinish = async (
    values
  ) => {
    try {
      await onSubmit(values);

      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="card-shadow"
      title={
        editingProduct
          ? "Edit Product"
          : "Add Product"
      }
      style={{
        marginBottom: "24px",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="SKU"
              name="sku"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="Stock"
              name="stock"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
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
              >
                {editingProduct
                  ? "Update"
                  : "Add Product"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default ProductForm;