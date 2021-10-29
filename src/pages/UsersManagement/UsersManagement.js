import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CachedIcon from "@material-ui/icons/Cached";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles, DialogTitle, DialogContent } from "./styles";
import slugify from "slugify";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAction,
  layDanhSachNguoiDungAction,
} from "../../redux/actions/UserManagementAction";
import Action from "./Action";
import Form from "./Form";
import { nanoid } from "nanoid";

import { Dialog } from "@material-ui/core";
import { resetMoviesManagement } from "../../redux/actions/FilmManagementAction";
export default function UsersManagement() {
  const classes = useStyles();
  const [usersListDisplay, setUsersListDisplay] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const selectedUser = useRef(null);
  console.log("selectedUser", selectedUser);

  const { enqueueSnackbar } = useSnackbar();
  const { usersList, loadingAddUser, successAddUser, errorAddUser } =
    useSelector((state) => state.UserManagementReducer);
  const dispatch = useDispatch();
  console.log("usersList", usersList);

  useEffect(() => {
    // get list user lần đầu
    if (!usersList || successAddUser || errorAddUser) {
      dispatch(layDanhSachNguoiDungAction());
    }
  }, [successAddUser, errorAddUser]);

  useEffect(() => {
    return () => {
      dispatch(resetMoviesManagement());
    };
  }, []);

  useEffect(() => {
    if (usersList) {
      let newUsersListDisplay = usersList.map((user, i) => ({
        ...user,
        id: user.taiKhoan,
      }));
      setUsersListDisplay(newUsersListDisplay);
    }
  }, [usersList]);

  const onAddUser = (userObj) => {
    if (!loadingAddUser) {
      dispatch(addUserAction(userObj));
    }

    setOpenModal(false);
  };

  const handleAddUser = () => {
    const emtySelectedUser = {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      maNhom: "",
      soDt: "",
      maLoaiNguoiDung: "",
    };
    selectedUser.current = emtySelectedUser;
    console.log("emtySelectedUser", emtySelectedUser);
    setOpenModal(true);
  };

  useEffect(() => {
    if (successAddUser) {
      enqueueSnackbar(`Thêm thành công tài khoản: ${successAddUser.taiKhoan}`, {
        variant: "success",
      });
    }
    if (errorAddUser) {
      enqueueSnackbar(errorAddUser, { variant: "error" });
    }
  }, [successAddUser, errorAddUser]);

  const handleClose = () => {
    setOpenModal(false);
  };
  const onFilter = () => {
    const searchUsersListDisplay = usersListDisplay.filter((user) => {
      const matchTaiKhoan =
        slugify(user.taiKhoan ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchMatKhau =
        slugify(user.matKhau ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchEmail =
        slugify(user.email ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchSoDt =
        slugify(user.soDt ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchHoTen =
        slugify(user.hoTen ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      const matchmaLoaiNguoiDung =
        slugify(user.maLoaiNguoiDung ?? "", modifySlugify)?.indexOf(
          slugify(valueSearch, modifySlugify)
        ) !== -1;
      return (
        matchTaiKhoan ||
        matchMatKhau ||
        matchEmail ||
        matchSoDt ||
        matchHoTen ||
        matchmaLoaiNguoiDung
      );
    });
    return searchUsersListDisplay;
  };

  const columns = useMemo(
    () =>
      // cột tài khoản không được chỉnh sửa, backend dùng "taiKhoan" để định danh user
      [
        {
          field: "xoa",
          headerName: "Hành động",
          width: 150,
          renderCell: () => <Action />,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "taiKhoan",
          headerName: "Tài Khoản",
          width: 180,

          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "matKhau",
          headerName: "Mật Khẩu",
          width: 170,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "hoTen",
          headerName: "Họ tên",
          width: 190,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "email",
          headerName: "Email",
          width: 250,
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "soDt",
          headerName: "Số điện thoại",
          width: 180,
          type: "number",
          headerAlign: "center",
          align: "left",
          headerClassName: "custom-header",
        },
        {
          field: "maLoaiNguoiDung",
          headerName: "Người dùng",
          type: "text",
          width: 160,
          headerAlign: "center",
          align: "center",
          headerClassName: "custom-header",
        },
      ],
    []
  );
  const modifySlugify = { lower: true, locale: "vi" };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <div className="container-fluid pb-3">
        <div className="row">
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Xoá user
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
            >
              Cập nhật user
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CachedIcon />}
            >
              làm mới
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loadingAddUser}
              startIcon={<PersonAddIcon />}
              onClick={handleAddUser}
            >
              thêm user
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              className={`${classes.userKhachHang} ${classes.button}`}
            >
              User khách hàng
            </Button>
          </div>
          <div className="col-3 pt-3">
            <Button
              variant="contained"
              className={`${classes.userQuanTri} ${classes.button}`}
            >
              User quản trị
            </Button>
          </div>
          <div className="col-12 pt-3 col-sm-6 col-md-4 col-lg-3">
            <Button
              variant="contained"
              className={`${classes.userModified} ${classes.button}`}
            >
              User đã chỉnh sửa
            </Button>
          </div>
          <div className="col-3 pt-3">
            <div className={`${classes.search} ${classes.button}`}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <DataGrid
        className={classes.rootDataGrid}
        rows={onFilter()}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[25, 50, 100]}
        disableSelectionOnClick
        // bật checkbox
        checkboxSelection
      />

      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        open={openModal}
        // className={classes.rootDialog}
      >
        <DialogTitle onClose={() => setOpenModal(false)}>Thêm User</DialogTitle>
        <DialogContent dividers>
          <Form
            selectedUser={selectedUser.current}
            // onUpdate={onUpdate}
            onAddUser={onAddUser}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}