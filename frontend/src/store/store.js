import { configureStore } from "@reduxjs/toolkit";
import {
    allUsersReducer,
    userReducer,
    postOfFollowingReducer,
    userProfileReducer,
} from "./Reducers/User"
import { likeReducer, userPostsReducer } from "./Reducers/Post";

const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing: postOfFollowingReducer,
        like: likeReducer,
        userProfile: userProfileReducer,
        userPosts: userPostsReducer,
        allUsers: allUsersReducer,
    }
})

export default store;