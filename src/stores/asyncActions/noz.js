import {ref, get} from "firebase/database";
import {db} from "../../firebase";
import {fetchNozAction} from "../nozleReducer";

export const fetchNoz = () => {
    const usersRef = ref(db, 'main/items/noz');

    return function (dispatch) {
        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const dataArray = Object.values(data);

                    dispatch(fetchNozAction(dataArray))
                }
            })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
    };
};
