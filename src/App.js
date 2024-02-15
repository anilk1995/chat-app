import { Switch } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import "./styles/main.scss";
import SignInPage from "./pages/SignInPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./pages/HomePage";
import { ProfileProvider } from "./context/profile.context";

function App() {
  return (
    <div>
      <ProfileProvider>
        <Switch>
          <PublicRoute path="/signin">
            <SignInPage />
          </PublicRoute>
          <PrivateRoute path="/">
            <HomePage />
          </PrivateRoute>
        </Switch>
      </ProfileProvider>
    </div>
  );
}

export default App;
