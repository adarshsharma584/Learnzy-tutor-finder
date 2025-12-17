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
import StudentDashboard from "./pages/dashboards/StudentDashboard.jsx";
import TuitionDashboard from "./pages/dashboards/TuitionDashboard.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import TestQuestions from "./pages/TestQuestions.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MapView from "./pages/MapView.jsx";
import TuitionDetails from "./pages/TuitionDetails.jsx";



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
        path: "/about",
        element: <About />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/me",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/become-tutor",
        element: (
          <ProtectedRoute>
            <TeacherRegister />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tutions",
        element: (
          <ProtectedRoute>
            <Tutions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tutions/:id",
        element: (
          <ProtectedRoute>
            <TuitionDetails />
          </ProtectedRoute>
        ),
      },
      {
        path:"/map",
        element: (
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/test-questions",
        element: (
          <ProtectedRoute>
            <TestQuestions />
          </ProtectedRoute>
        ),
      },

      {
        path: "/verify-otp",
        element: (
          
            <OtpGenerationPage />
         
        ),
      },
      {
        path: "/dashboards/tutor",
        element: (
          <ProtectedRoute>
            <TuitionDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboards/student",
        element: (
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
