import Navbar from "./Components/Navigation/Navbar";
import AppRoutes from "./Config/Routes/AppRoutes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme/Theme";
import { ApiProvider } from "./Actions/API/ApiProvider";
import { LanguageProvider } from "./Config/Languages/LanguageProvider";
function App() {

  return (

      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <ApiProvider>

            <Navbar />
            <AppRoutes />

          </ApiProvider>
        </ThemeProvider>
      </LanguageProvider>
  );
}

export default App;
