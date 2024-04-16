import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { InterfaceLayer } from "./layers/interface";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <InterfaceLayer />
  </React.StrictMode>,
);