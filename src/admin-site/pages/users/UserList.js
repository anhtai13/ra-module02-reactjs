import { Table, Button, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import AdminPaginationComponent, {
  NUMBER_RECORDS_PER_PAGE,
} from "../../components/table/AdminPaginationComponent";

import userApi from "../../../apis/user.api";

const formatName = (firstName, lastName) => {
  return (firstName || "") + " " + (lastName || "");
};

const formatRole = (role) => {
  if (role === 1) {
    return <Badge bg="warning">Quản trị viên</Badge>;
  } else if (role === 2) {
    return <Badge>Khách hàng</Badge>;
  }
};

function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchInputValue, setSearchInputValue] = useState("");

  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const fetchUsers = () => {
    userApi
      .searchUsers({
        name: keyword,
        page: page,
        limit: NUMBER_RECORDS_PER_PAGE,
      })
      .then((data) => {
        setUsers(data.records);
        setTotal(data.total);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          navigate("/admin/login");
        } else {
          alert(error.response.statusText);
        }
      });

    setSelectedUserIds([]);
  };

  useEffect(() => {
    fetchUsers();
  }, [keyword, page]);

  const handleSearch = (event) => {
    event.preventDefault();
    setKeyword(searchInputValue);
  };

  const handleAdd = () => {
    navigate("/admin/users/new");
  };

  const handleEdit = (id) => {
    navigate(`/admin/users/${id}/edit`);
  };

  const handleBulkDelete = () => {
    const usernames = users
      .filter(
        (user) =>
          !!selectedUserIds.find(
            (selectedUserId) => selectedUserId === user.user_id
          )
      )
      .map((user) => user.username);

    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa người dùng [${usernames}] không ?`
      )
    ) {
      // TODO
      fetchUsers();
    }
  };

  const handleDelete = (id, username) => {
    if (
      window.confirm(`Bạn có chắc chắn muốn xóa người dùng ${username} không ?`)
    ) {
      userApi
        .deleteUser(id)
        .then(() => {
          fetchUsers();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert(error.response.statusText);
            navigate("/admin/login");
          } else {
            alert(error.response.statusText);
          }
        });
    }
  };

  const changeUserIdCheckbox = (event) => {
    if (event.target.checked) {
      setSelectedUserIds([...selectedUserIds, parseInt(event.target.value)]);
    } else {
      const newSelectedUserIds = selectedUserIds.filter(
        (selectedUserId) => selectedUserId !== parseInt(event.target.value)
      );
      setSelectedUserIds(newSelectedUserIds);
    }
  };

  const selectAllUserIdCheckboxes = (event) => {
    if (event.target.checked) {
      const userIds = users.map((user) => user.user_id);
      setSelectedUserIds(userIds);
    } else {
      setSelectedUserIds([]);
    }
  };

  const isSelectedAllUserId =
    selectedUserIds.length !== 0 && selectedUserIds.length === users.length;

  return (
    <>
      <h1>Danh sách người dùng</h1>
      <Form className="row m-1 mb-3" onSubmit={handleSearch}>
        <div className="col-8">
          <Form.Control
            type="text"
            value={searchInputValue}
            onChange={(event) => setSearchInputValue(event.target.value)}
            placeholder="Nhập từ khóa"
          />
        </div>
        <div className="col-4">
          <Button type="submit" variant="info mx-1">
            Tìm kiếm
          </Button>
          <Button type="button" variant="primary mx-1" onClick={handleAdd}>
            Thêm mới
          </Button>
          {selectedUserIds.length !== 0 && (
            <Button
              type="button"
              variant="danger mx-1"
              onClick={handleBulkDelete}
            >
              Xóa
            </Button>
          )}
        </div>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={selectAllUserIdCheckboxes}
                checked={isSelectedAllUserId}
              />
            </th>
            <th>Tên đăng nhập</th>
            <th>Địa chỉ E-mail</th>
            <th>Tên người dùng</th>
            <th>Vai trò</th>
            <th>Thời gian tạo</th>
            <th>Thời gian cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="id"
                    id={"id-" + user.id}
                    value={user.id}
                    onChange={changeUserIdCheckbox}
                    checked={selectedUserIds.find((id) => id === user.id)}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{formatName(user.first_name, user.last_name)}</td>
                <td>{formatRole(user.role)}</td>
                <td>{moment(user.created_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>{moment(user.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                <td>
                  <Button
                    variant="warning"
                    className="m-1"
                    onClick={() => handleEdit(user.id)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    className="m-1"
                    onClick={() => handleDelete(user.id, user.username)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AdminPaginationComponent total={total} setPage={setPage} />
    </>
  );
}

export default UserList;
