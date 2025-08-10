import React from "react";
import { useRoutes, type RouteObject } from "react-router-dom";

const PomodoroPages = React.lazy(() => import("../pages/pomodoro-pages"));

const router: RouteObject[] = [
  {
    path: "/",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <PomodoroPages />
      </React.Suspense>
    ),
  },
  // {
  //   path: "/:id",
  //   element: (
  //     <React.Suspense fallback={<div>Loading...</div>}>
  //       <PomodoroPages />
  //     </React.Suspense>
  //   ),
  // },
];

const Routes: React.FC = () => {
  //   const token = useAuthStore((state) => state.users.token);

  //   const routes = token ? route_auth : route_unauth;

  return useRoutes([
    ...router,
    // ...route_mobile,
    // {
    //   path: "*",
    //   element: <Navigate to={token ? "/dashboard" : "/signin"} replace />,
    // },
  ]);
};

export default Routes;
