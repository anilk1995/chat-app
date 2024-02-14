import { Switch } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import SignInPage from "./pages/SignInPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Switch>
        <PublicRoute path="/signin">
          <SignInPage />
        </PublicRoute>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
