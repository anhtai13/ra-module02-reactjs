import { createReducer } from "@reduxjs/toolkit";

const defaultAdmin = {
  admin: [
    { id: 1, email: "admin@gmail.com", password: btoa("admin"), role: "admin" },
  ],
};

const adminAuthReducer = createReducer(
  { isLogin: false, userLogin: null },
  {
    ADMIN_LOGIN: (state, action) => {
      // const users = window.localStorage.getItem("users") || [defaultAdmin];
      const users = defaultAdmin.admin;
      const input = action.payload;

      let isLogin = false;
      let userLogin = null;

      for (const user of users) {
        if (user.email === input.email) {
          if (user.role === "admin" && atob(user.password) === input.password) {
            // window.localStorage.setItem("adminAuthLogin", JSON.stringify(user));
            userLogin = { ...user };
            isLogin = true;
          }
          break;
        }
      }

      return {
        ...state,
        isLogin: isLogin,
        userLogin: userLogin,
      };
    },

    ADMIN_LOGOUT: (state, action) => {
      // window.localStorage.removeItem("adminAuthLogin");
      return {
        ...state,
        userLogin: null,
        isLogin: false,
      };
    },
  }
);

export default adminAuthReducer;
