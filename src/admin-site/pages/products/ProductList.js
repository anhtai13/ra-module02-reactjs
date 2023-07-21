import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminDeleteProduct } from "../../store/actions/adminProductAction";
import { useState } from "react";
import Form from "react-bootstrap/Form";

function ProductList() {
  const products = useSelector((state) => state.productAdReducer.products);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want delete product?")) {
      dispatch(adminDeleteProduct({ id: id }));
    }
  };
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="text-center mt-3">
      <div className="pb-4">
        <h2>Product Manager</h2>

        <div>
          <Link
            to={"/admin/product/add"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button className="float-end m-1" variant="primary">
              ADD
            </Button>
          </Link>
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
            <th>ID</th>
            <th>Name Product</th>
            <th>Decription</th>
            <th>Price</th>
            <th style={{ width: "170px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => {
            return (
              product.nameProduct
                .toLowerCase()
                .includes(searchValue.toLowerCase()) && (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.nameProduct}</td>
                  <td>{product.description}</td>
                  <td>${product.unitPrice}</td>
                  <td>
                    <Link
                      to={`/admin/product/edit/${product.id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <Button variant="primary" style={{ marginRight: "10px" }}>
                        Edit
                      </Button>
                    </Link>

                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="danger"
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

export default ProductList;
