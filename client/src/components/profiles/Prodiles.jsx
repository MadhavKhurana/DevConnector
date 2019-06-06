import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/common.jsx";
import { getProfiles } from "../../actions/profileActions.js";
import ProfileItem from './ProfileItem.jsx'

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const {  loading } = this.props.profile;
        const profile= this.props.profile.profiles 
        let profileItems;

        if (profile === null || loading) {
            profileItems = <Spinner />;
        } else {
            if (profile.length > 0) {
                profileItems = profile.map(profile=>(
                    <ProfileItem key={profile._id} profile={profile} />
                ))
            } else {
                profileItems = <h4>No Profiles Found...</h4>;
            }
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">
                                Developer Profiles
                            </h1>
                            <p className="lead text-center">
                                Browse and connect with developers
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    profile: state.profile
});

export default connect(
    mapStatetoProps,
    { getProfiles }
)(Profiles);
