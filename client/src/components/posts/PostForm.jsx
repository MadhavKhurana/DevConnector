import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.jsx";
import { addPost } from "../../actions/postActions.js";

class PostForm extends Component {
    state = {
        text: "",
        errors: {}
    };


    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({
                errors:newProps.errors
            })
        }
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })   
    }
    
    onSubmit=(e)=>{
        e.preventDefault()
        
        const {user}=this.props.auth
        
        const newPost={
            text:this.state.text,
            name:user.name,
            avatar:user.avatar
        }
        this.props.addPost(newPost)
        this.setState({text:''})
    }

    render() {
        
        const errors=this.state.errors
        
        return (
            <div>
                <div className="post-form mb-3">
                    <div className="card card-info">
                        <div className="card-header bg-info text-white">
                            Say Somthing...
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextAreaFieldGroup
                                        placeholder='Create a post'
                                        name='text'
                                        value={this.state.text}
                                        onChange={this.onChange}
                                        error={errors.text}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
     auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStatetoProps,{addPost})(PostForm);
