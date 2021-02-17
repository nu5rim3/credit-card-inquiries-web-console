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

const authProtectedRoutes = [
  { path: "/login/profile", component: UserProfile },
  { path: "/profile", component: UserProfile },
  { path: "/view-documents/:refNo", component: Document },
  { path: "/dashboard", component: Dashboard },
  { path: "/applications", component: Application },

  // this route should be at the end of all other routes
  // { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "/", exact: true, component: () => <Redirect to="/applications" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }
