import React from "react";
import ReactDOM from "react-dom/client"
import { Route, RouterProvider } from "react-router-dom";
import { rout } from "./rout/Rout";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={rout}/>)

