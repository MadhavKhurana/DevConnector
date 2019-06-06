import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Landing from "./components/layout/Landing.jsx";
import Register from "./components/auth/Register.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import CreateProfile from "./components/create-profile/CreateProfile.jsx";
import EditProfile from "./components/edit-profile/EditProfile.jsx";
import AddExperience from "./components/add-credentials/AddExperience.jsx";
import AddEducation from "./components/add-credentials/AddEducation.jsx";
import Login from "./components/auth/Login.jsx";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.js";
import { setCurrentUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";
import "./App.css";
import Profiles from "./components/profiles/Prodiles.jsx";
import Profile from "./components/profile/Profile.jsx";
import Posts from "./components/posts/Post.jsx";

//check for token
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/profiles"
                                component={Profiles}
                            />
                            <Route
                                exact
                                path="/profile/:handle"
                                component={Profile}
                            />
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                                <PrivateRoute
                                    exact
                                    path="/create-profile"
                                    component={CreateProfile}
                                />
                                <PrivateRoute
                                    exact
                                    path="/edit-profile"
                                    component={EditProfile}
                                />
                                <PrivateRoute
                                    exact
                                    path="/add-experience"
                                    component={AddExperience}
                                />
                                <PrivateRoute
                                    exact
                                    path="/add-education"
                                    component={AddEducation}
                                />
                                <PrivateRoute
                                    exact
                                    path="/feed"
                                    component={Posts}
                                />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
