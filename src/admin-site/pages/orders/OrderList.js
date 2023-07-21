import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromOrder } from "../../../customer-site/store/actions/customerCartAction";
import { useState } from "react";

function OrderList() {
  const orders = useSelector((state) => state.customerCartReducer.order);

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");

  const handleDeleteOrder = (id) => {
    const isDeleteOrder = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này không ?"
    );
    if (isDeleteOrder) {
      dispatch(deleteFromOrder(id));
    }
  };

  return (
    <div className="text-center" style={{ marginTop: "60px" }}>
      <div style={{ paddingBottom: "80px" }}>
        <h2 className="float-start m-1">Order Manager</h2>

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
            {/* <th>Tên sản phẩm</th> */}
            <th>Email</th>
            <th>Ngày đặt hàng</th>
            <th>Tổng đơn hàng</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item, index) => {
            return (
              item.email.toLowerCase().includes(searchValue.toLowerCase()) && (
                <tr key={index}>
                  <td>{item.id}</td>
                  {/* <td>{item.code}</td> */}
                  <td>{item.email}</td>
                  <td>{item.date}</td>
                  <td>${item.total}</td>

                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteOrder(item.id)}
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

export default OrderList;
