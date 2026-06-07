import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
} from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

function CustomerForm({
  onSubmit,
  editingCustomer,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingCustomer) {
      form.setFieldsValue(editingCustomer);
    }
  }, [editingCustomer, form]);

  const handleFinish = async (values) => {
    try {
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      title={
        editingCustomer
          ? "Edit Customer"
          : "Add Customer"
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
          <Col span={8}>
            <Form.Item
              label="Customer Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  type: "email",
                  message:
                    "Enter valid email",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message:
                    "Address is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
        >
          {editingCustomer
            ? "Update Customer"
            : "Add Customer"}
        </Button>
      </Form>
    </Card>
  );
}

export default CustomerForm;