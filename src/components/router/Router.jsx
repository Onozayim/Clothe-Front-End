import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import OnlyGuestRoutes from "./OnlyGuestRoutes";
import Login from "../../pages/login/Login";
import me from "../../services/me";
import Store from "../../pages/Store/Store";
import Register from "../../pages/register/Register";

export default function Router({ token, email }) {

  const getMe = async () => {
    console.log("MEMEMEM");
    await me();
  };

  console.log("ROUTER()");

  return (
    <BrowserRouter>
      {console.log("RENDER ROUTER")}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={
            <div className="text-3xl font-bold underline">
              <button onClick={getMe}>ME</button>
            </div>
          }
        />

        <Route
          path="/store"
          element={<Store />}
        />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoutes token={token} />}>
          <Route
            path="/me"
            element={
              <div className="text-3xl font-bold underline">
                <p>{email}</p>
              </div>
            }
          />
        </Route>

        {/* GUEST ROTUES */}
        <Route element={<OnlyGuestRoutes token={token} />}>
          <Route path="/login" element={<Login key={"login"} />} />
          <Route path="/register" element={<Register key={"register"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
