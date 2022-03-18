import {SET_LOADING_STATUS, GET_POSTS, GET_USERS_POST, GET_USERS, GIVE_LIKES} from "../actions/actionType";

export const initState = {
    posts: [],
    postsUser: [],
    users: [],
    loading: false,
    likes: 0,
};

const articleReducer = (state = initState, action) => {
    switch(action.type) {
        case GIVE_LIKES:
            return {
                ...state,
                likes: action.likes
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_USERS_POST:
            return {
                ...state,
                postsUsers: action.payload
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SET_LOADING_STATUS:
            return{
                ...state,
                loading: action.status
            }
        default:
            return state;
    }
};

export default articleReducer;