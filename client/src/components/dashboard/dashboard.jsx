import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile,deleteAccount } from "../../actions/profileActions.js";
import Spinner from "../common/common.jsx";
import ProfileActions from './ProfileActions.jsx'
import Experience from './Experience.jsx'
import Education from './Education.jsx'

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick=(e)=>{
        this.props.deleteAccount()
    }
    
    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className='lead text-muted'>Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                        <ProfileActions/>
                        
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>
                        
                        <div style={{marginBottom:'60px'}}>
                            <button onClick={this.onDeleteClick} className='btn btn-danger'>Delete My Account</button>
                        </div>
                    </div>
                );
            } else {
                dashboardContent=(
                    <div>
                        <p className='lead text-muted'>Welcome {user.name}</p>
                        <p>You have not setup a profile, please add some info</p>
                        <Link to='/create-profile' className='btn btn-lg btn-info'>Create Profile</Link>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
});

export default connect(
    mapStatetoProps,
    { getCurrentProfile,deleteAccount }
)(Dashboard);
