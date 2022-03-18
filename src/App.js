import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Home/Header';
import Home from './components/Home/Home';
import { useEffect } from 'react';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';
import UserPage from "./components/Profile/UserPage";
import Users from "./components/NetWork/NetWork";

const App = (props) => {


  useEffect(() => {
    props.getUserAuth();
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/profile">
            <UserPage />
          </Route>
          <Route path="/network">
            <Users />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
