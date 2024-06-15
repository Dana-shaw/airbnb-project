import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import LandingPage from "./pages/LandingPage";
import SpotDetailPage from "./pages/SpotDetailPage/SpotDetailPage";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import ManageSpotsPage from "./pages/ManageSpotsPage";
import EditSpotForm from "./components/EditSpotForm/EditSpotForm";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetailPage />
        
      },
      {
        path: "/spots/:spotId/edit",
        element: <EditSpotForm />
        
      },
      {
        path: "/spots/new",
        element: <CreateSpotForm />
        
      },
      {
        path: "/spots/current",
        element: <ManageSpotsPage />
        
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
