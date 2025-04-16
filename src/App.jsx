import { useState, useContext } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { AuthContext } from "./providers/AuthProvider";
import Router from "./components/router/Router";

function App() {
  const [dark, setDartk] = useState(true);
  const { token, email } = useContext(AuthContext);

  console.log("APP()");

  return (
    <div
      className={`${
        dark ? "dark" : ""
      }  min-h-screen max-w-screen bg-gray-100 dark:bg-gray-900`}
    >
      <Navbar darkChanger={setDartk} dark={dark} token={token} />
      <Router token={token} email={email} />
    </div>
  );
}

export default App;
