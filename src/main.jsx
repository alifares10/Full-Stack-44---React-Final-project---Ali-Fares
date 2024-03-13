import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { ThemeProvider } from "@/components/theme-provider";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/rootReducer.jsx";
import { BrowserRouter } from "react-router-dom";
import NavBar from "@/components/ui/navBar.jsx";
import Footer from "./components/ui/footer.jsx";
import ToastProvider from "./components/toast-provider.jsx";

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
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
