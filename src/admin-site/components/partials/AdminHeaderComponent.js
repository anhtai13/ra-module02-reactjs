import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { adminAuthLogout } from "../../store/actions/adminAuthAction";
import { useDispatch } from "react-redux";

function AdminHeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(adminAuthLogout());
    navigate("/admin/login");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-secondary">
        <Container fluid>
          <Navbar.Brand href="#">Adminstration</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link
                  to="/admin"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Home
                </Link>
              </Nav.Link>

              <Nav.Link>
                <Link
                  to="/admin/customer"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Customers
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/admin/product"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Products
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/admin/order"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Orders
                </Link>
              </Nav.Link>
              <NavDropdown title="Action" className="float-end">
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminHeaderComponent;
