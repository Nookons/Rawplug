import {ref, get} from "firebase/database";
import {db} from "../../firebase";
import {fetchNozzleAction} from "../itemsReducer";

export const fetchNozzle = () => {
    const usersRef = ref(db, 'main/items/noz');

    return function (dispatch) {
        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const dataArray = Object.values(data);

                    dispatch(fetchNozzleAction(dataArray))
                }
            })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
    };
};
