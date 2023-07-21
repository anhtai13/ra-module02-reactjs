import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import AdminHeaderComponent from "../components/partials/AdminHeaderComponent";
import AdminFooterComponent from "../components/partials/AdminFooterComponent";

function AdminLayout() {
  return (
    <Container>
      <header>
        <AdminHeaderComponent />
      </header>
      <div></div>
      <Outlet />
      <div>
        <AdminFooterComponent />
      </div>
    </Container>
  );
}

export default AdminLayout;
