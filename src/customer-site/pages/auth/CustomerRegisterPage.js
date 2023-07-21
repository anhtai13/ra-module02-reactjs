import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customerRegister } from "../../store/actions/customerAuthAction";
import { useEffect } from "react";

function CustomerRegisterPage() {
  let usersDB = useSelector((state) => state.customerAuthReducer.listCustomer);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState({
    isShowStatus: false,
    status: false,
    errorMsg: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    validate(user);
  }, [user]);

  const handleRegister = async (e) => {
    e.preventDefault();

    await validate(user);

    if (error.status) {
      // render lỗi và kết thúc
      await setError({ ...error, isShowStatus: true });
      return;
    } else {
      // render không lỗi
    }

    //  Kiểm tra email đã đăng ký chưa
    let isDulicate = false; //tạo cờ, khởi tạo cờ là false (không trùng)
    usersDB.forEach((item) => {
      if (item.email === user.email) {
        isDulicate = true;
      }
    });

    if (isDulicate === false) {
      delete user.confirmPassword;

      // user.name = "";
      user.cart = [];
      // user.bday = "";
      // user.status = true;
      // user.date = getCurrentTimeString();
      user.role = "user";
      user.add = "";
      user.phone = "";
      // user.img =
      //   "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif";

      dispatch(customerRegister(user));

      //   Chuyển sang login
      navigate("/login");
    } else {
      await setError({
        ...error,
        isShowStatus: true,
        status: true,
        errorMsg:
          "Email đã tồn tại, vui lòng đăng nhập hoặc đăng ký bằng một email khác",
      });
    }
  };

  const validate = (data) => {
    let newError = { ...error }; // Tạo một bản sao của error hiện tại

    if (data.email == "" || data.password == "" || data.confirmPassword == "") {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    } else if (data.password !== data.confirmPassword) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu nhập lại không chính xác";
    } else if (data.password.length < 6) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu không được ngắn hơn 6 ký tự";
    } else if (
      !(
        data.password.match(/[a-z]/) &&
        data.password.match(/[A-Z]/) &&
        data.password.match(/\d/)
      )
    ) {
      newError.status = true;
      newError.errorMsg =
        "Mật khẩu cần bao gồm ký tự IN HOA, chữ thường và chữ số";
    } else {
      newError = { isShowStatus: false, status: false, errorMsg: "" };
    }

    setError(newError); // Cập nhật error
  };

  return (
    <div className="signup d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="from_container p-5 bg-white">
        <Form onSubmit={handleRegister}>
          <h3>Sign Up</h3>

          {/* "Form.group" Email address */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {/* "Form.group" Password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>

          {/* "Form.group" Nhập lại password */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Re-Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
          </Form.Group>
          {error.isShowStatus == true && error.status == true && (
            <p
              id="Error"
              style={{
                color: "#a11515",
                padding: "20px",
                textAlign: "center ",
              }}
            >
              {error.errorMsg}
            </p>
          )}
          <Form.Group className="d-grid mb-3">
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form.Group>
          <Form.Group>
            <Link to={"/login"}>Sign In</Link>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default CustomerRegisterPage;
