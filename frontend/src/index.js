import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SocketContextProvider } from "./components/context/SocketContext";

// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </Provider>
  // </React.StrictMode>
);
