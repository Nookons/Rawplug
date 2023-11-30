import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";
import {userGetAction} from "../../userReducer";

export const getUser = () => {
    return function (dispatch) {
        // Start the sign-in process
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const user = user;
                dispatch(userGetAction(user? user : 'test'))
            }
        });
    };
};
