import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AppRouter from "./AppRouter";
import reportWebVitals from "./reportWebVitals";
import { UserContextProvider } from "./context";
import { Helmet, HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Moonshot | Where Gen-Zs Build</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
