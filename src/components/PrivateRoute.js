import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

function PrivateRoute({ children, ...routeProps }) {
  const profile = false;

  if (!profile) return <Redirect to="/signin" />;

  return <Route {...routeProps}>{children}</Route>;
}

export default PrivateRoute;
