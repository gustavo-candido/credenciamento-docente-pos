import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./user";

function loggedRoute(element: JSX.Element): JSX.Element {
  const { user } = useUser();
  const hasUser = !!user;

  if (hasUser) {
    return element;
  }

  return <Navigate to="/" />;
}

export default loggedRoute;
