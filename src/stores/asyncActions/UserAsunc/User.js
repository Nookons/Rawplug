import {userEnterAction, userLogOutAction} from "../../userReducer";
import { signInWithEmailAndPassword, signOut, updateProfile  } from "firebase/auth";
import { auth } from "../../../firebase";

export const signInUser = (code) => {
    return function (dispatch) {
        // Start the sign-in process
        signInWithEmailAndPassword(auth, 'rawplug@gmail.com', code)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                updateProfile(auth.currentUser, {
                    displayName: "Test User", photoURL: "https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png"
                }).then(() => {
                    console.log('Profile updated')
                }).catch((error) => {
                    console.error(error)
                });

                // Dispatch the action with the user information
                dispatch(userEnterAction({ user }));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };
};
export const signOutUser = () => {
    return function (dispatch) {
        signOut(auth).then(() => {
            console.log('Sign-out successful')
            dispatch(userLogOutAction())
        }).catch((error) => {
            // An error happened.
        });
    };
};
