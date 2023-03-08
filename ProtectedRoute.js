import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { verifyToken } from "./api/auth";

const ProtectedRoute = (Component) => {
  const AuthRoute = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        verifyToken(token).then((response) => {
          if (response.success) {
            setAuthenticated(true);
          } else {
            history.push("/login");
          }
        });
      } else {
        history.push("/login");
      }
    }, [history]);

    return authenticated ? <Component /> : null;
  };

  return AuthRoute;
};

export default ProtectedRoute;

// To verify a login token in a React app to allow access to protected routes, you can follow these general steps:

// Upon successful login, the server should send a token to the client. The token should be stored securely on the client-side, typically in local storage or a cookie.
// In your React app, you can create a higher-order component (HOC) that wraps around the protected routes you want to secure. This HOC should check for the presence of the token in local storage or a cookie and verify its validity by sending it to the server for validation.
// If the token is valid, the server should send a response indicating that the token is authenticated. If the token is not valid, the server should send an error response.
// Based on the response from the server, the HOC should either render the protected component or redirect to a login page.
// For each protected route, you can simply render the HOC instead of the component you want to protect.
// Here is some sample code for the HOC:
