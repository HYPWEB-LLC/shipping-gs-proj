// App.jsx
import React, { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header"; // Import your header component
import Loader from "./components/layout/Loader"; // Loading component

const Home = lazy(() => import("./pages/Home")); // Lazy load Home
const FAQs = lazy(() => import("./pages/FAQs")); // Lazy load FAQs
const Addresses = lazy(() => import("./pages/Addresses")); // Lazy load Addresses
const CreateAddresses = lazy(() => import("./pages/CreateAddressess")); // Lazy load CreateAddresses
const CreateCSVOrder = lazy(() => import("./components/styles/CreateCSVOrder"));
const Login = lazy(() => import("./pages/Login")); // Lazy load Login
const NotFound = lazy(() => import("./pages/NotFound")); // Lazy load NotFound
const CreateOrders = lazy(() => import("./pages/CreateOrders")); // Lazy load CreateOrders


function App() {
  const location = useLocation(); // Access the current route

  // const { user } = useSelector((state) => state.auth); // Uncomment and use this for protected routes

  return (
    <>
      {/* Show Header on all routes except /login */}
      <div className="flex">
        {location.pathname !== "/login" && <Header />}
        <div className="flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Use the below commented code after setting protected routes */}
              {/* 
              <Route
                element={
                  <ProtectRoute user={user} />
                }
              >
                <Route path="/" element={<Home />} />{" "}
              </Route> 
              */}
              <Route path="/" element={<Home />} />
              <Route path="/FAQs" element={<FAQs />} />
              <Route path="/createOrders" element={<CreateOrders />} />
              <Route path="/csv-orders" element={<CreateCSVOrder />} />
              <Route path="/Addresses" element={<Addresses />} />
              <Route path="/CreateAddresses" element={<CreateAddresses />} />
              <Route
                path="/login"
                element={
                  // <ProtectRoute user={!user} redirect="/">
                  <Login />
                  //  </ProtectRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>

      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
