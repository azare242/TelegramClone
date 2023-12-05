import { Routes, Route } from "react-router-dom";
import { publicRoutes, AppRouteType } from "./index.tsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((route: AppRouteType) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

export default AppRoutes;
