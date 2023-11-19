import {ref, get} from "firebase/database";
import {db} from "../../firebase";
import {fetchBarrelAction} from "../barrelReducer";
import {fetchCartridgeAction} from "../cartridgeReducer";

export const fetchCartridge = () => {
    const usersRef = ref(db, 'main/items/cartridge');

    return function (dispatch) {
        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const dataArray = Object.values(data);

                    dispatch(fetchCartridgeAction(dataArray))
                }
            })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
    };
};
