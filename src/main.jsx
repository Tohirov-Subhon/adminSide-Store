import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StyledEngineProvider } from "@mui/material";
import { store } from './store/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")).render(
    <StyledEngineProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </StyledEngineProvider>
);
