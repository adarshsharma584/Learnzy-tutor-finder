import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react"
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import SignUp from "./pages/SignUp.jsx"
import SignIn from "./pages/SignIn.jsx";
import {createBrowserRouter,RouterProvider} from "react-router-dom";

const router = createBrowserRouter(
  [
  {path:"/",
  element:<App/>
},{
  path:"/signup",
  element:<SignUp/>
},
{
  path:"/signin",
  element:<SignIn/>
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <RouterProvider router={router}/>
  </StrictMode>,
)
