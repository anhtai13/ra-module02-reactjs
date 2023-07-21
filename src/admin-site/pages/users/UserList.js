import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerDelete } from "../../../customer-site/store/actions/customerAuthAction";

function UserList() {
  const user = useSelector((state) => state.customerAuthReducer.listCustomer);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want delete product?")) {
      dispatch(customerDelete(email));
    }
  };

  return (
    <div className="text-center mt-3">
      <div className="pb-4">
        <h2>User Manager</h2>

        <div>
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setSearchValue(e.target.value.toString());
            }}
          />
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => {
            return (
              user.email.toLowerCase().includes(searchValue.toLowerCase()) && (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      onClick={() => handleDelete(user.email)}
                      variant="danger"
                      style={{ textAlign: "center" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
