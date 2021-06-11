import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import UserProfile from "../pages/Authentication/UserProfile"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Application from "../pages/Application/index"
import Document from "../pages/Document/index";
import ViewFile from "../pages/Document/ViewFile";

// Users
import Users from "../pages/Users/index";
import UserCreate from "../pages/Users/UserCreate";
import UserUpdate from "../pages/Users/UserUpdate";

// Invitation
import Invitation from "../pages/Invitation/index";

const authProtectedRoutes = [
  { path: "/admin/profile", component: UserProfile },
  { path: "/profile", component: UserProfile },
  { path: "/view-documents/file**", component: ViewFile },
  { path: "/view-documents/:refNo", component: Document },
  { path: "/dashboard", component: Dashboard },
  { path: "/applications", component: Application },

  { path: "/users", component: Users },
  { path: "/users/create", component: UserCreate },
  { path: "/users/update/:id", component: UserUpdate },


  { path: "/invitations", component: Invitation },
  
  { path: "/", exact: true, component: () => <Redirect to="/applications" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }
