import {ref, get} from "firebase/database";
import {db} from "../../firebase";
import {addManyCustomersAction, removeBarrelAction} from "../barrelReducer";

export const fetchUsers = () => {
    const usersRef = ref(db, 'main/items/Barrel');

    return function (dispatch) {
        get(usersRef)
            .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const dataArray = Object.values(data);

                dispatch(addManyCustomersAction(dataArray))
                dispatch(removeBarrelAction(dataArray))
            }
        })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
    };
};
