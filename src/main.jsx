import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.jsx";
import theme from "./theme/theme.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { setupAxiosInterceptors } from "./services/api/axios.js";
import AuthInitializer from "./features/auth/AuthInitializer";

setupAxiosInterceptors(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthInitializer>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <App />
          </ThemeProvider>
        </AuthInitializer>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
