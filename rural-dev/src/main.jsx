import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./assets/components/home/home";
import Calculator from "./assets/components/finnaceCalculator/FinanceCalculator.jsx";
import Workshop from "./assets/components/workshop/workshop.jsx";
import Job from "./assets/components/job/job.jsx";
import Marketplace from "./assets/components/marketplace/marketplace.jsx";
import Login from "./assets/components/login/AuthHero.jsx";
import Profile from "./assets/components/profile/profile.jsx";
import Log from "./assets/components/log/userlog.jsx";
import Admin from "./assets/components/marketplace/admin.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserProvider } from "./userContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "workshop",
        element: <Workshop />,
      },
      {
        path: "job",
        element: <Job />,
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },

      {
        path: "/finance-calculator",
        element: <Calculator />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/logs",
        element: <Log />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
