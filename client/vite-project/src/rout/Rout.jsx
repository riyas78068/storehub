import React from "react";
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Applayout } from "../applayout/Applayout";
import { AuthProvider } from "../context/AuthContext";
import Addproduct from '../components/Addproduct'
import Contact from '../components/Contact'
import Home from '../components/Home'
import Product from '../components/product'





export const rout = createBrowserRouter([
    {
        element: <AuthProvider><Applayout/></AuthProvider>,
        children: [
            {
                path:"/",
                element:<Home/>
            },
             {
                path:"/login",
                element:<Login/>
            },
             {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/product",
                element:<ProtectedRoute><Product/></ProtectedRoute>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/addproduct",
                element:<ProtectedRoute><Addproduct/></ProtectedRoute>
            }

        ]
    }
])