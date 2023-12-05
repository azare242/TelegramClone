import Navbar from "./Components/Navigation/Navbar";
import AppRoutes from "./Config/Routes/AppRoutes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme/Theme";
import { ApiProvider } from "./Actions/API/ApiProvider";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApiProvider>
        <Navbar />
        <AppRoutes />
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
