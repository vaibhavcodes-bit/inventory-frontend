import {
  Card,
  Form,
  InputNumber,
  Button,
  Row,
  Col,
} from "antd";
import { useEffect } from "react";

function OrderForm({
  onSubmit,
  editingOrder,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingOrder) {
      form.setFieldsValue(editingOrder);
    }
  }, [editingOrder, form]);

  const handleFinish = async (values) => {
    try {
      await onSubmit(values);

      if (!editingOrder) {
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      title={
        editingOrder
          ? "Edit Order"
          : "Create Order"
      }
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
              label="Customer ID"
              name="customer_id"
              rules={[
                {
                  required: true,
                  message:
                    "Customer ID required",
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

          {!editingOrder && (
            <Col span={8}>
              <Form.Item
                label="Product ID"
                name="product_id"
                rules={[
                  {
                    required: true,
                    message:
                      "Product ID required",
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
          )}

          <Col span={8}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message:
                    "Quantity required",
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
        </Row>

        <Button
          type="primary"
          htmlType="submit"
        >
          {editingOrder
            ? "Update Order"
            : "Create Order"}
        </Button>
      </Form>
    </Card>
  );
}

export default OrderForm;