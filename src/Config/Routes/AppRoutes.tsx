import { Routes, Route } from "react-router-dom";
import { routes, AppRouteType } from "./index.tsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {routes.map((route: AppRouteType) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default AppRoutes;
