import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions.js";

class Experience extends Component {
    delete(id) {
        this.props.deleteExperience(id, this.props.history);
    }
    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (
                        " Now"
                    ) : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                </td>
                <td>
                    <button
                        onClick={this.delete.bind(this, exp._id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));

        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                        </tr>

                        {experience}
                    </tbody>
                </table>
            </div>
        );
    }
}
Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(
    null,
    { deleteExperience }
)(withRouter(Experience));
