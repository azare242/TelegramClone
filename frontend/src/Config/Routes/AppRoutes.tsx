import { Routes, Route } from "react-router-dom";
import { publicRoutes, AppRouteType } from "./index.tsx";
import NotFound from "../../Pages/404/NotFound.tsx";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {publicRoutes.map((route: AppRouteType, index: number) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound/>  }/>
      </Routes>
      
    </>
  );
};

export default AppRoutes;
