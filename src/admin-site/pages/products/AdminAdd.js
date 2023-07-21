import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { adminAddProduct } from "../../store/actions/adminProductAction";
import { useDispatch } from "react-redux";

function AdminAdd() {
  const [imgProduct, setImgProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitAdd = (event) => {
    event.preventDefault();

    dispatch(
      adminAddProduct({
        imgProduct: imgProduct,
        nameProduct: nameProduct,
        price: price,
        quantity: quantity,
        description: description,
      })
    );
    navigate("/admin/product");
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <Form
        expand="lg"
        className="bg-body-secondary"
        onSubmit={handleSubmitAdd}
      >
        <h2 style={{ marginTop: "10px" }}>Product add</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name Product</Form.Label>
          <Form.Control
            type="Name Product"
            placeholder="Name Product"
            onChange={(event) => setNameProduct(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            onChange={(event) => setPrice(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Quantity"
            onChange={(event) => setQuantity(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="Description"
            placeholder="Description"
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Img Product</Form.Label>
          <Form.Control
            type="Img"
            placeholder="Img Product"
            onChange={(event) => setImgProduct(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
          <Link
            to={"/admin/product"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Back
          </Link>
        </Button>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
export default AdminAdd;
