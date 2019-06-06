import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostItem from "./PostItem.jsx";

class PostFeed extends Component {
    render() {
        const posts = this.props.posts;

        return (
            <div>
                {posts.map(post => {
                    return <PostItem key={post._id} post={post} />;
                })}
            </div>
        );
    }
}

export default PostFeed;
