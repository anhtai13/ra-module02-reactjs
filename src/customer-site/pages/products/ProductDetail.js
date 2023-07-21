import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/actions/customerCartAction";
import { useNavigate } from "react-router-dom";

function ProductDetail({ product }) {
  // console.log(product);
  const [searchValue, setSearchValue] = useState("");
  const [quantity, setQantity] = useState(1);
  const dispatch = useDispatch();
  let customerLogin = useSelector(
    (state) => state.customerAuthReducer.customerLogin
  );
  const navigate = useNavigate();

  const handleChangeQuantity = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setQantity(value);
    }
  };

  const handleAdd = () => {
    if (customerLogin == null) {
      navigate("/login");
    } else {
      dispatch(
        addToCart({
          ...product,
          quantity: quantity,
        })
      );
    }
  };

  return (
    <div>
      <Card>
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body>
          <Card.Title>{product.nameProduct}</Card.Title>
          <Badge bg="secondary">${product.unitPrice}</Badge>
          <Card.Text>{product.description}</Card.Text>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              type="number"
              value={quantity}
              onChange={handleChangeQuantity}
              min={1}
            />
            <Button variant="primary" onClick={handleAdd}>
              Add
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductDetail;
