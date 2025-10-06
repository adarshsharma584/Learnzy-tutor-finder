import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import TeacherRegister from "./pages/TeacherRegister.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Tutions from "./pages/Tutions.jsx";
import Profile from "./pages/Profile.jsx";
import Layout from "./components/Layout.jsx";
import OtpGenerationPage from "./pages/OtpGenerationPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/signup",
        element: <SignUp />,
       
      },
      {
        path: "/signin",
        element: <SignIn />,
       
      },
      {
        path: "/become-tutor",
        element: <TeacherRegister />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/tutions",
        element: <Tutions />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/otp",
        element: <OtpGenerationPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
