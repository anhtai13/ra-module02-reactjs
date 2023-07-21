import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  changeQuantity,
  checkOut,
} from "../../store/actions/customerCartAction";

function CartList() {
  
  const cart = useSelector((state) => state.customerCartReducer.cart) ?? [];

  const total = useSelector((state) => state.customerCartReducer.total);

  const order = useSelector((state) => state.customerCartReducer.order);

  const email = useSelector(
    (state) => state.customerAuthReducer.customerLogin.email
  );

  const dispatch = useDispatch();


  const handleChange = (e, id) => {
    const quantity = Number(e.target.value);

    if (quantity > 0) {
      dispatch(
        changeQuantity({
          id,
          quantity,
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleCheckOut = () => {
    const isCheckout = window.confirm(
      "Bạn có chắc chắn muốn đặt đơn hàng này ?"
    );
    if (isCheckout) {
      dispatch(
        checkOut({
          id: order.length ? order[order.length - 1].id + 1 : 1,
          email: email,
          item: cart,
          total: total,
        })
      );
    }
  };
  return (
    <div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.nameProduct}</td>
                  <td>${item.unitPrice}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleChange(e, item.id)}
                    />
                  </td>
                  <td>${item.subTotal}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>Tổng giá đơn hàng</td>
              <td>${total}</td>
              <td>
                <Button class="btn btn-info" onClick={handleCheckOut}>
                  Order
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </div>
  );
}
export default CartList;
