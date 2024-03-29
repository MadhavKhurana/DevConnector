import axios from "axios";

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get("http://localhost:5000/api/profile")
        .then(res =>
            dispatch({
                type: "GET_PROFILE",
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: "GET_PROFILE",
                payload: {}
            })
        );
};

export const setProfileLoading = () => {
    return {
        type: "PROFILE_LOADING"
    };
};

export const clearCurrentProfile = () => {
    return {
        type: "CLEAR_CURRENT_PROFILE"
    };
};

export const createProfile = (profileData, history) => dispatch => {
    axios
        .post("http://localhost:5000/api/profile", profileData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: "GET_ERRORS",
                payload: err.response.data
            })
        );
};

export const deleteAccount = () => dispatch => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
        axios
            .delete("http://localhost:5000/api/profile")
            .then(res =>
                dispatch({
                    type: "SET_CURRENT_USER",
                    payload: {}
                })
            )
            .catch(err =>
                dispatch({
                    type: "GET_ERRORS",
                    payload: err.response.data
                })
            );
    }
};

export const addExperience = (expData, history) => dispatch => {
    axios
        .post("http://localhost:5000/api/profile/experience", expData)
        .then(res => history.push("./dashboard"))
        .catch(err =>
            dispatch({
                type: "GET_ERRORS",
                paylaod: err.response.data
            })
        );
};

export const addEducation = (eduData, history) => dispatch => {
    axios
        .post("http://localhost:5000/api/profile/education", eduData)
        .then(res => history.push("./dashboard"))
        .catch(err =>
            dispatch({
                type: "GET_ERRORS",
                paylaod: err.response.data
            })
        );
};

export const deleteExperience = (id, history) => dispatch => {
    axios
        .delete(`http://localhost:5000/api/profile/experience/${id}`)
        .then(res =>
            dispatch({
                type: "GET_PROFILE",
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

export const deleteEducation = id => dispatch => {
    axios
        .delete(`http://localhost:5000/api/profile/education/${id}`)
        .then(res =>
            dispatch({
                type: "GET_PROFILE",
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

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get('http://localhost:5000/api/profile/all')
        .then(res =>
            dispatch({
                type: "GET_PROFILES",
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: "GET_PROFILES",
                paylaod: null
            })
        );
};

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());

    axios
        .get(`http://localhost:5000/api/profile/handle/${handle}`)
        .then(res =>
            dispatch({
                type: "GET_PROFILE",
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: "GET_PROFILE",
                paylaod: null
            })
        );
};
