import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import UserProfile from "../pages/Authentication/UserProfile";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Application from "../pages/Application/index";
import SwaireeApplication from "../pages/SwaireeApplication/index";
import Document from "../pages/Document/index";
import SwaireeDocument from "../pages/SwaireeDocument/index";
import ViewFile from "../pages/Document/ViewFile";

// Users
import Users from "../pages/Users/index";
import UserCreate from "../pages/Users/UserCreate";
import UserUpdate from "../pages/Users/UserUpdate";

// Branches
import Branches from "../pages/Branches/index";
import BranchCreate from "../pages/Branches/BranchCreate";
import BranchUpdate from "../pages/Branches/BranchUpdate";

// Shops
import Shops from "../pages/Shops/index";
import ShopCreate from "../pages/Shops/ShopCreate";
import ShopUpdate from "../pages/Shops/ShopUpdate";

// Invitation
import Invitation from "../pages/Invitation/index";
import CommonApplication from "pages/CommonApplication";

const authProtectedRoutes = [
  { path: "/admin/profile", component: UserProfile },
  { path: "/profile", component: UserProfile },
  { path: "/view-documents/file**", component: ViewFile },
  { path: "/view-documents/:refNo", component: Document },
  { path: "/view-swairee-documents/:refNo", component: SwaireeDocument },
  { path: "/dashboard", component: Dashboard },
  { path: "/common-applications", component: CommonApplication },
  { path: "/applications", component: Application },
  { path: "/swairee-applications", component: SwaireeApplication },

  { path: "/users", component: Users },
  { path: "/users/create", component: UserCreate },
  { path: "/users/update/:id", component: UserUpdate },

  { path: "/branches", component: Branches },
  { path: "/branches/create", component: BranchCreate },
  { path: "/branches/update/:id", component: BranchUpdate },

  { path: "/shops", component: Shops },
  { path: "/shops/create", component: ShopCreate },
  { path: "/shops/update/:id", component: ShopUpdate },

  { path: "/invitations", component: Invitation },

  { path: "/", exact: true, component: () => <Redirect to="/applications" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
