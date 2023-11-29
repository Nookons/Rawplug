import {ref, get} from "firebase/database";
import {db} from "../../firebase";
import {fetchBarrelAction} from "../itemsReducer";

export const fetchBarrel = () => {
    const usersRef = ref(db, 'main/items/barrel');

    return function (dispatch) {
        get(usersRef)
            .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const dataArray = Object.values(data);

                dispatch(fetchBarrelAction(dataArray))
            }
        })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
    };
};
