import "./LoginForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminAuthLogin } from "../../store/actions/adminAuthAction";

function AdminLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isLogin = useSelector((state) => state.adminAuthReducer.isLogin);

  if (isLogin) {
    navigate("/admin");
  }

  const handleSubmit = (e) => {
    if (email.length === 0 || password.length === 0) {
      return;
    }

    e.preventDefault();

    const formInput = {
      email: email,
      password: password,
    };
    dispatch(adminAuthLogin(formInput));
    setErrorMessage("Email hoặc mật khẩu không đúng.");
  };

  return (
    <div className="login d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="40-w p-5 rounded bg-white">
        <Form>
          <h3>Sign In Adminstration</h3>
          <p className="text-danger">{errorMessage}</p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
