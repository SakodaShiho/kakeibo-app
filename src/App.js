import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Signup";

function App() {
  return (
    <div>
      <Router>
        <Signup />
        <Route exact path="/Login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
