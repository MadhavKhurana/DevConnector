import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions.js";

class Education extends Component {
    delete(id) {
        this.props.deleteEducation(id);
    }
    render() {
        const education = this.props.education.map(exp => (
            <tr key={exp._id}>
                <td>{exp.school}</td>
                <td>{exp.degree}</td>
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
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                        </tr>

                        {education}
                    </tbody>
                </table>
            </div>
        );
    }
}
Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

export default connect(
    null,
    { deleteEducation }
)(withRouter(Education));
