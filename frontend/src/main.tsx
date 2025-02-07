// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./app/store.tsx";
import axios from "axios";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster />
  </HelmetProvider>
);
