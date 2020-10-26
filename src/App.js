import React, { useEffect, useState } from "react";
import classes from "./App.css";
import { Auth } from "./containers";
import Router from "./router";
import { Layout } from "./components";
import { validateToken, initializeSentry } from "./store/util";
import store from "./store";
import { useSelector } from "react-redux";
import { loginSuccessful } from "./store/actions";

function App() {
  const [isStoreInitialized, setStoreInitialized] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.loggedIn);
  
  // Initialize store from localstorage
  useEffect(() => {
    const checkValidToken = validateToken();
    if (checkValidToken.isValid){
      initializeSentry(checkValidToken.authData.userId);
      store.dispatch(loginSuccessful(checkValidToken.authData));
    }

    setStoreInitialized(true);
  }, []);

  if (!isStoreInitialized) return null;

  return (
    <>
      {/* {!isLoggedIn ? (
        <Auth />
      ) : ( */}
        <Layout>
          <Router />
        </Layout>
      {/* )} */}
    </>
  );
  
}

export default App;
