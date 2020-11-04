import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "bootstrap/js/src/collapse.js";
import AuthService from "../../services/auth.service";


import BoardAdmin from "../../components/board-admin.component";
import BoardModerator from "../../components/board-moderator.component";
import BoardUser from "../../components/board-user.component";
import Profile from "../../components/profile.component";
import Register from "../../components/register.component";
import Login from "../../components/login.component";
import Home from "../../components/home.component";
import Todo from "../example/Todo";
import AddTodos from "../example/AddTodos";
import Example from "../example/Example";
import BodyExample from "../example/BodyExample";


const Header = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <Link to={"/"} className="navbar-brand">
          Job Portal
        </Link>
   
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>


  <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/todos"} className="nav-link">
              Todos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/example"} className="nav-link">
              Example
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/bodyex"} className="nav-link">
              Body Example
            </Link>
          </li>


          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
          
        )}
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/todos" component={Todo} />
          <Route path="/AddTodos" component={AddTodos} />
          <Route path="/example" component={Example} />
          <Route path="/bodyex" component={BodyExample} />
          
        </Switch>
      </div>
    </div>
    
  );
};

export default Header;