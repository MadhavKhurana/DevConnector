import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions.js";
import { setCurrentUser } from "../../actions/authActions.js";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup.jsx";

class Login extends Component {
  state = {
    email: "",
    password: "",

    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    console.log("lol");

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your DevConnector account
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="Email Address"
                    name="email"
                    required='true'
                  />
                  <TextFieldGroup
                    type="password"
                    placeholder="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    name="password"
                    required='true'
                  />

                  
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatetoProps,
  { loginUser, setCurrentUser }
)(Login);
