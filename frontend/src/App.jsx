import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import * as sessionActions from "./store/session";
import LandingPage from "./pages/LandingPage";
import SpotDetailPage from "./pages/SpotDetailPage/SpotDetailPage";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";

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
        path: "/spots/new",
        element: <CreateSpotForm />
        
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
