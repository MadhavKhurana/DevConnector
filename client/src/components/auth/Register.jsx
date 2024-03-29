import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions.js";
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
import classnames from 'classnames'

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser,this.props.history);
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      name="name"
                      required
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      value={this.state.email}
                      onChange={this.onChange}
                      placeholder="Email Address"
                      name="email"
                      required
                    />
                    <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      onChange={this.onChange}
                      value={this.state.password}
                      className="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      onChange={this.onChange}
                      className="form-control  form-control-lg"
                      value={this.state.password2}
                      placeholder="Confirm Password"
                      name="password2"
                      required
                    />
                  </div>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatetoProps,
  { registerUser }
)(withRouter(Register));
