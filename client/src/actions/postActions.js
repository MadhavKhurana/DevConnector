import axios from "axios";

export const addPost = postData => dispatch => {
    axios
        .post("http://localhost:5000/api/posts", postData)
        .then(res =>
            dispatch({
                type: "ADD_POST",
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: "GET_ERRORS",
                paylaod: err.response.data
            })
        );
};

export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get("http://localhost:5000/api/posts")
        .then(res =>
            dispatch({
                type: "GET_POSTS",
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: "GET_POSTS",
                paylaod: null
            })
        );
};

export const setPostLoading = () => {
    return {
        type: "POST_LOADING"
    };
};

export const deletePost = id => dispatch => {
    //    dispatch(setPostLoading());
    axios
        .delete(`http://localhost:5000/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: "DELETE_POST",
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: "GET_ERRORS",
                paylaod: err.response.data
            })
        );
};

export const addLike = id => dispatch => {
    //    dispatch(setPostLoading());
    axios
        .post(`http://localhost:5000/api/posts/like/${id}`)
        .then(res =>
            dispatch(getPosts()
            )
        )
        .catch(err =>
            dispatch({
                type: "GET_ERRORS",
                paylaod: err.response.data
            })
        );
};

export const removeLike = id => dispatch => {
    //    dispatch(setPostLoading());
    axios
        .post(`http://localhost:5000/api/posts/unlike/${id}`)
        .then(res =>
            dispatch(getPosts()
            )
        )
        .catch(err =>
            dispatch({
                type: "GET_ERRORS",
                paylaod: err.response.data
            })
        );
};
