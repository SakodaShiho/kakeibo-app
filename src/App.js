import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthProvider";
import "./firebase";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
