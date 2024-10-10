// App.jsx
import React, { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header"; // Import your header component
import Loader from "./components/layout/Loader"; // Loading component

const Home = lazy(() => import("./pages/Home"));
const CreateOrders = lazy(() => import("./pages/CreateOrders"));
const FedexOrder = lazy(() => import("./pages/FedexOrder"));
const CreateFedexOrder = lazy(() => import("./pages/CreateFedexOrder"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Addresses = lazy(() => import("./pages/Addresses"));
const CreateAddresses = lazy(() => import("./pages/CreateAddressess"));
const AmazonCSVGenerator = lazy(() => import("./pages/AmazonCSVGenerator"));
const Login = lazy(() => import("./pages/Login")); // Lazy load Login
const NotFound = lazy(() => import("./pages/NotFound")); // Lazy load NotFound

function App() {
  const location = useLocation(); // Access the current route

  // const { user } = useSelector((state) => state.auth); use this code for protect route

  return (
    <>
      {/* Show Header on all routes except /login */}
      <div className="flex">
        {location.pathname !== "/login" && <Header />}
        <div className="flex-grow">
          <Suspense fallback={<Loader />}>
            {/* Use below commented code after setting protected route */}
            <Routes>
              {/* <Route
            element={
                <ProtectRoute user={user} />
            }
            >
              <Route path="/" element={<Home />} />{" "}
            </Route> */}

              <Route path="/" element={<Home />} />
              <Route path="/createOrders" element={<CreateOrders />} />
              <Route path="/fedexOrder" element={<FedexOrder />} />
              <Route
                path="/create-fedex-Order"
                element={<CreateFedexOrder />}
              />
              <Route path="/FAQs" element={<FAQs />} />
              <Route path="/Addresses" element={<Addresses />} />
              <Route
                path="/AmazonCSVGenerator"
                element={<AmazonCSVGenerator />}
              />

              <Route
                path="/login"
                element={
                  // <ProtectRoute user={!user} redirect="/">
                  <Login />
                  //  {/* </ProtectRoute> */}
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
