import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        padding: "20px",
        background: "#001529",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Products
      </Link>

      <Link to="/customers" style={{ color: "white" }}>
        Customers
      </Link>

      <Link to="/orders" style={{ color: "white" }}>
        Orders
      </Link>
    </div>
  );
}

export default Navbar;