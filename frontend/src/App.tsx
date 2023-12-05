import Navbar from "./Components/Navigation/Navbar";
import AppRoutes from "./Config/Routes/AppRoutes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme/Theme";
function App() {

  return (
    <ThemeProvider theme={theme}>
    <>
      <Navbar/>
      <AppRoutes/>
    </>
    </ThemeProvider>
  );

}

export default App;
