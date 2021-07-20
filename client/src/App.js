import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Login from "./components/Login";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getActivePack } from "./actions/packs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("movieHubProfile"))
  );
  const { isLoading } = useSelector((state) => state.packs);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("movieHubProfile")));
  }, [location]);

  useEffect(() => {
    if (user) {
      dispatch(getActivePack(user?.result?.id));
    }
  }, [user]);

  return (
    <div className="app">
      {isLoading && <Loader />}
      <Header user={user} />
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/profile" /> : <Login />}
        </Route>
        <Route exact path="/profile">
          {user ? (
            <Profile user={user} setUser={setUser} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
