import {ref, get} from "firebase/database";
import {db} from "../../firebase";
import {addActionAction} from "../actionsReducer";

export const fetchActions = () => {
    const usersRef = ref(db, 'main/action');

    return function (dispatch) {
        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const dataArray = Object.values(data);

                    dispatch(addActionAction(dataArray))
                }
            })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
    };
};
