import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NavBar from "@/components/ui/navBar.jsx";
import Footer from "./components/ui/footer.jsx";
import ToastProvider from "./components/toast-provider.jsx";
import reduxStore from "./redux/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={reduxStore}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ToastProvider />
          <NavBar />
          <App />
          <Footer />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
