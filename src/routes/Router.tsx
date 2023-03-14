import * as React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import {
  Layout,
  LoadingProgress,
  RequireFallback,
} from "../components/reuse-components";
import { useAppSelector } from "../redux/store";
import { Api } from "./api";

export interface IRouterProps {}

export default function Router(props: IRouterProps) {
  const bool = useAppSelector((state) => state.auth.bool);

  const isAuth = useAppSelector((state) => state.global.isAuth);

  return useRoutes([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/api",
      element: <Api />,
    },
    {
      path: "/dashboard",
      element: (
        <RequireFallback
          bool={isAuth}
          fallback={
            bool ? (
              <>
                <LoadingProgress />
                <Layout variants={["hidden"]}>
                  <Dashboard />
                </Layout>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Dashboard />
        </RequireFallback>
      ),
    },
  ]);
}

const Root = React.lazy(() => import("./root"));
const Login = React.lazy(() => import("./login"));
const Register = React.lazy(() => import("./register"));
const Dashboard = React.lazy(() => import("./dashboard"));
