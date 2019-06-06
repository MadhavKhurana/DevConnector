import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup.jsx";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.jsx";
import InputGroup from "../common/InputGroup.jsx";
import SelectListGroup from "../common/SelectListGroup.jsx";
import {
    createProfile,
    getCurrentProfile
} from "../../actions/profileActions.js";
import isEmpty from "./is-empty.js";

class CreateProfile extends Component {
    state = {
        displaySocialInputs: false,
        handle: "",
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
        errors: {}
    };

    componentDidMount = () => {
        this.props.getCurrentProfile();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            const skillsCSV = profile.skills.join(",");

            profile.company = !isEmpty(profile.company) ? profile.comapny : "";
            profile.website = !isEmpty(profile.website) ? profile.website : "";
            profile.location = !isEmpty(profile.location)
                ? profile.location
                : "";
            profile.githubusername = !isEmpty(profile.githubusername)
                ? profile.githubusername
                : "";
            profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : "";
            profile.facebook = !isEmpty(profile.facebook)
                ? profile.facebook
                : "";
            profile.instagram = !isEmpty(profile.instagram)
                ? profile.instagram
                : "";
            profile.linkedin = !isEmpty(profile.linkedin)
                ? profile.linkedin
                : "";
            profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";

            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: profile.skills,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };
        this.props.createProfile(profileData, this.props.history);
    };
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const options = [
            { label: "* Select Professional Status", value: 0 },
            { label: "Developer", value: "Developer" },
            { label: "Junior Developer", value: "Junior Developer" },
            { label: "Senior Developer", value: "Senior Developer" },
            { label: "Manager", value: "Manager" },
            { label: "Student or Learning", value: "Student or Learning" },
            { label: "Instructer or Teacher", value: "Instructer or Teacher" },
            { label: "Intern", value: "Intern" },
            { label: "Other", value: "Other" }
        ];

        const { errors, displaySocialInputs } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                        
                    />
                    <InputGroup
                        placeholder="Facebook page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="LinkedIn profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        return (
            <div className="create=profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Edit Profile
                            </h1>

                            <small className="d-block pb-3">
                                * = required fields
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL."
                                    required='true'
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    options={options}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    info="Tell something about your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please Use comma seperated values (eg: HTML,CSS,JavaScript,PHP)"
                                    required='true'
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us about yourself"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                        className="btn btn-light"
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(
    mapStatetoProps,
    { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
