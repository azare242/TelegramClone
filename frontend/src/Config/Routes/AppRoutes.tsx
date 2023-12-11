import { Routes, Route } from "react-router-dom";
import { publicRoutes, AppRouteType } from "./index.tsx";
import NotFound from "../../Pages/404/NotFound.tsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((route: AppRouteType) => (
          <Route path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound/>  }/>
      </Routes>
    </>
  );
};

export default AppRoutes;
