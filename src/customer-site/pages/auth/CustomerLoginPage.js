import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { customerLogin } from "../../store/actions/customerAuthAction";
import { useNavigate } from "react-router-dom";

function CustomerLoginPage() {
  let usersDB = useSelector((state) => state.customerAuthReducer.listCustomer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    isShowStatus: false,
    status: false,
    errorMsg: "",
  });

  // lấy dữ liệu input
  const handleGetInput = async (event) => {
    user[event.target.id] = event.target.value;
    setUser({ ...user });
    await validate(user);
  };

  // handle submit
  const handleSubmit = async (event) => {
    // // Lỗi thì ngưng chạy
    event.preventDefault();

    await validate(user);
    // console.log("submit");

    if (error.status) {
      // render lỗi và kết thúc
      await setError({ ...error, isShowStatus: true });
      return;
    } else {
      // render không lỗi
    }

    //  Kiểm tra email đã đăng ký chưa
    let isDulicate = false;
    let userLogin = { ...user };

    usersDB.forEach(async (item) => {
      if (item.email === user.email && item.password === user.password) {
        isDulicate = true;
        userLogin = item;
      }
    });

    if (isDulicate === true) {
      dispatch(customerLogin(userLogin));

      //   Chuyển sang login

      navigate("/");
    } else if (isDulicate === false) {
      await setError({
        ...error,
        isShowStatus: true,
        status: true,
        errorMsg: "Email không tồn tại hoặc mật khẩu không chính xác",
      });
    }
  };

  // validate data login
  const validate = async (data) => {
    let newError = { ...error }; // Tạo một bản sao của error hiện tại

    if (data.email == "" || data.password == "") {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    } else {
      newError = { isShowStatus: false, status: false, errorMsg: "" };
    }

    setError(newError); // Cập nhật error
  };

  return (
    <div className="login d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
      <div className="40-w p-5 rounded bg-white">
        <Form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <Form.Group
            className="mb-3"
            // controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              onChange={(event) => handleGetInput(event)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3"
            // controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              onChange={(event) => handleGetInput(event)}
            />
          </Form.Group>
          {error.isShowStatus == true && error.status == true && (
            <p
              id="Error"
              style={{
                textAlign: "center ",
                color: "#a11515",
                padding: "20px",
              }}
            >
              {error.errorMsg}
            </p>
          )}{" "}
          <Form.Group className="d-grid mb-3">
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form.Group>
          <Form.Group>
            <Link to={"/register"}>Sign up</Link>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default CustomerLoginPage;
