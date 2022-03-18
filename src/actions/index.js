import {auth, provider, storage} from "../firebase";
import {SET_USER, SET_LOADING_STATUS, GET_POSTS, GET_USERS} from "./actionType";
import db from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status
})

export const getPosts = (payload) => ({
    type: GET_POSTS,
    payload: payload
})

export const getUsers = (payload) => ({
    type: GET_USERS,
    payload: payload
})

export const giveLikes = (payload) => ({

})

export function signInAPI() {
    return (dispatch) => {
        auth
            .signInWithPopup(provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((error) => console.log(error.message));
    };
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                db
                    .collection("users")
                    .doc(user.uid)
                    .set({
                        user: {
                            email: user.email,
                            name: user.displayName,
                            photoURL: user.photoURL
                        }
                    });
                dispatch(setUser(user));
                return user;
            }
        })
    }
}

export function signOutAPI() {
    return (dispatch) => {
        auth
            .signOut()
            .then(() => {
                dispatch(setUser(null))
            })
            .catch((error) => console.log(error.message))
    }
}

export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
        if (payload.image != "") {
            const upload = storage.ref(`images/${payload.image.name}`).put(payload.image);
            upload.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);
                    if (snapshot.state === "RUNNING") {
                        console.log(`Progress: ${progress}%`)
                    }
                },
                (error) => console.log(error.code),
                async () => {
                    const downloadURL = await upload.snapshot.ref.getDownloadURL();
                    db
                        .collection("posts")
                        .add({
                            actor: {
                                description: payload.user.email,
                                name: payload.user.displayName,
                                image: payload.user.photoURL,
                                id: payload.user.uid
                            },
                            video: payload.video,
                            sharedImg: downloadURL,
                            comments: 0,
                            description: payload.description,
                            likes: 0,
                        })
                        .catch((error) => console.log(error.message));
                    db
                        .collection("users")
                        .doc(payload.user.uid)
                        .collection("postsUser")
                        .add({
                            actor: {
                                description: payload.user.email,
                                name: payload.user.displayName,
                                image: payload.user.photoURL,
                                id: payload.user.uid
                            },
                            video: payload.video,
                            sharedImg: downloadURL,
                            comments: 0,
                            description: payload.description,
                            likes: 0,
                        });
                    dispatch(setLoading(false));
                }
            );
        } else if (payload.video) {
            db
                .collection("posts")
                .add({
                    actor: {
                        description: payload.user.email,
                        name: payload.user.displayName,
                        image: payload.user.photoURL,
                        id: payload.user.uid
                    },
                    video: payload.video,
                    shareImg: "",
                    comment: 0,
                    description: payload.description,
                    likes: 0,

                })
                .catch((error) => console.log(error.message));
            db
                .collection("users")
                .doc(payload.user.uid)
                .collection("postsUser")
                .add({
                    actor: {
                        description: payload.user.email,
                        name: payload.user.displayName,
                        image: payload.user.photoURL,
                        id: payload.user.uid
                    },
                    video: payload.video,
                    sharedImg: "",
                    description: payload.description,
                    likes: 0,
                });
            dispatch(setLoading(false));
        } else {
            db.collection("posts")
                .add({
                    actor: {
                        description: payload.user.email,
                        name: payload.user.displayName,
                        image: payload.user.photoURL,
                        id: payload.user.uid
                    },
                    video: "",
                    shareImg: "",
                    description: payload.description,
                    likes: 0,
                });
            db
                .collection("users")
                .doc(payload.user.uid)
                .collection("postsUser")
                .add({
                    actor: {
                        description: payload.user.email,
                        name: payload.user.displayName,
                        image: payload.user.photoURL,
                        id: payload.user.uid
                    },
                    video: "",
                    sharedImg: "",
                    description: payload.description,
                    likes: 0,
                });
        }
    };
}

export function getArticlesAPI() {
    return (dispatch) => {
        let payload;

        db.collection("posts")
            .orderBy("actor", "desc")
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data());
                console.log(payload);
                dispatch(getPosts(payload));
            });
    }
}

export function getUsersArticlesAPI() {
    return (dispatch) => {
        let payload;

        const [user] = useAuthState(auth);

        db
            .collection("users")
            .doc(user.uid)
            .collection("postsUser")
            .orderBy("actor", "desc")
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data());
                console.log(payload);
                dispatch(getPosts(payload));
            });
    }
}

export function getUsersAPI() {
    return (dispatch) => {
        let payload;

        db
            .collection("users")
            .orderBy("user", "desc")
            .onSnapshot((snapshot) => {
                payload = snapshot.docs.map((doc) => doc.data());
                console.log("users", payload);
                dispatch(getUsers(payload));
            })
    }
}



