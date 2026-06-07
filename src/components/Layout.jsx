import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

function AppLayout({ children }) {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: "20px",
            marginRight: "40px",
          }}
        >
          Inventory System
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{
            flex: 1,
            background: "#0f172a",
          }}
          items={[
            {
              key: "/",
              label: <Link to="/">Products</Link>,
            },
            {
              key: "/customers",
              label: <Link to="/customers">Customers</Link>,
            },
            {
              key: "/orders",
              label: <Link to="/orders">Orders</Link>,
            },
          ]}
        />
      </Header>

      <Content
        style={{
          padding: "30px",
        }}
      >
        <div className="page-container">
          {children}
        </div>
      </Content>
    </Layout>
  );
}

export default AppLayout;