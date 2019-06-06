import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {deletePost,addLike,removeLike} from '../../actions/postActions.js'

class PostItem extends Component {
  onDelete(id) {
    console.log(id);
    this.props.deletePost(id)
  }
  
  onLikeClick(id){
    this.props.addLike(id)
  }
  onUnlikeClick(id){
    this.props.removeLike(id)
  }
  
  findUserLike(likes){
    const {auth}=this.props
    if(likes.filter(like=>like.user===auth.user.id).length>0){
      return true
    }else{
      return false
    }
  }

  render() {
    const { post, auth } = this.props;

    return (
      <div>
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={post.avatar}
                  alt=""
                />
              </a>
              <br />
              <p className="text-center">{post.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{post.text}</p>
              <button onClick={this.onLikeClick.bind(this,post._id)} type="button" className="btn btn-light mr-1">
                <i className="text-info fas fa-thumbs-up" />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button onClick={this.onUnlikeClick.bind(this,post._id)} type="button" className="btn btn-light mr-1">
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
              

              {post.avatar === auth.user.avatar ? (
                <button
                  onClick={this.onDelete.bind(this, post._id)}
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStatetoProps,{deletePost,addLike,removeLike})(PostItem);
