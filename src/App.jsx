import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import CustomThemeProvider from "./providers/CustomThemeProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import UserProvider from "./users/providers/UserProvider";
import { SearchProvider } from "./providers/SearchProvider";
import { CardProvider } from "./cards/providers/CardProvider";

function App() {
  return (
    <>
      <UserProvider>
        <CustomThemeProvider>
          <SnackbarProvider>
            <SearchProvider>
              <CardProvider>
                <BrowserRouter>
                  <Layout>
                    <Router />
                  </Layout>
                </BrowserRouter>
              </CardProvider>
            </SearchProvider>
          </SnackbarProvider>
        </CustomThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;

