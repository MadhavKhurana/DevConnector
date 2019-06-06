import React, { Component } from "react";
import ProfileHeader from "./ProfileHeader.jsx";
import ProfileAbout from "./ProfileAbout.jsx";
import ProfileCreds from "./ProfileCreds.jsx";
import ProfileGithub from "./ProfileGithub.jsx";
import Spinner from "../common/common.jsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions.js";

class Profile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }

    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;

        if (profile === null || loading) {
            profileContent = <Spinner />;
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link
                                to="/profiles"
                                className="btn btn-light mb-3 float-left"
                            >
                                Back To Profiles
                            </Link>
                        </div>
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds education={profile.education} experience={profile.experience} />
                    
                    
                    
                </div>
            );
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{profileContent}
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    profile: state.profile
});

export default connect(
    mapStatetoProps,
    { getProfileByHandle }
)(Profile);
