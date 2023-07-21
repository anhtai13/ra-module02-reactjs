import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductDetail from "./ProductDetail";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const getRows = (products) => {
  let rows = [];
  let row = [];

  for (const product of products) {
    row.push(product);

    if (row.length === 3) {
      rows.push(row);
      row = [];
    }
  }

  if (row.length !== 0) {
    rows.push(row);
  }
  return rows;
};

function ProductList() {
  const products = useSelector((state) => state.productAdReducer.products);

  const rows = getRows(products);

  const [searchValue, setSearchValue] = useState("");

  const filteredRows = getRows(products).filter((row) => {
    return row.some((product) =>
      product.nameProduct.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <div className="text-center mt-3">
      <div className="pb-4">
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setSearchValue(e.target.value.toString());
          }}
        />
      </div>

      <div>
        {filteredRows.map((row, index) => {
          return (
            <Row key={index}>
              {row.map((product, index) => {
                return (
                  <Col key={index}>
                    <ProductDetail product={product} />
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
    </div>
  );
}
export default ProductList;
