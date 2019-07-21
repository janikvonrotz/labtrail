import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/qr">Qr</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/qr" component={Qr} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Qr() {
  return (
    <div>
      <h2>Qr</h2>
    </div>
  );
}

function Login({ match }) {
  return (
    <div>
      <h2>Login</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default BasicExample;
