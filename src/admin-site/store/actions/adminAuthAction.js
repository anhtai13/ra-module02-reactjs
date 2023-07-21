import { createAction } from "@reduxjs/toolkit";

const adminAuthLogin = createAction("ADMIN_LOGIN");
const adminAuthLogout = createAction("ADMIN_LOGOUT");

export { adminAuthLogin, adminAuthLogout };
