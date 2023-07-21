import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminUpdateProduct,
  adminGetProduct,
} from "../../store/actions/adminProductAction";

function AdminEdit() {
  const products = useSelector((state) => state.productAdReducer.products);
  const [newCode, setCodeProduct] = useState();
  const [newNameProduct, setNameProduct] = useState();
  const [newUnitPrice, setUnitPrice] = useState();
  const [newQuantity, setQuantity] = useState();
  const [newDescription, setDescription] = useState();
  const [newImgProduct, setImgProduct] = useState();
  const [idEdit, setIdEdit] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(adminGetProduct(products));
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
        setCodeProduct(products[i].idProduct);
        setIdEdit(products[i].id);
        setUnitPrice(products[i].unitPrice);
        setQuantity(products[i].quantity);
        setDescription(products[i].description);
        setImgProduct(products[i].imageUrl);
        setNameProduct(products[i].nameProduct);
        break;
      }
    }
  }, []);

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    dispatch(
      adminUpdateProduct({
        id: idEdit,
        idProduct: newCode,
        nameProduct: newNameProduct,
        unitPrice: newUnitPrice,
        quantity: newQuantity,
        description: newDescription,
        imageUrl: newImgProduct,
      })
    );
    document.getElementById("form").reset();
    navigate("/admin/product");
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <Form
        id="form"
        expand="lg"
        className="bg-body-secondary"
        onSubmit={handleSubmitUpdate}
      >
        <h2 style={{ marginTop: "10px" }}>Update Product</h2>

        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="ID"
            placeholder="ID"
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="ID Product"
            placeholder="ID Product"
            defaultValue={newCode}
            onChange={(e) => setCodeProduct(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name Product</Form.Label>
          <Form.Control
            type="Name Product"
            placeholder="Name Product"
            defaultValue={newNameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            defaultValue={newUnitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Quantity"
            defaultValue={newQuantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Decription</Form.Label>
          <Form.Control
            type="Decription"
            placeholder="Decription"
            defaultValue={newDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Img Product</Form.Label>
          <Form.Control
            type="Img"
            placeholder="Img Product"
            defaultValue={newImgProduct}
            onChange={(e) => setImgProduct(e.target.value)}
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
export default AdminEdit;
