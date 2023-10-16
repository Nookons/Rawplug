import {getDatabase, ref, set, push, onValue} from "firebase/database";
import {db} from "../firebase";

export function writeMyUserData({data}) {
    const id = Date.now();

    // Extract the 'value' property from each object using map
    const values = data.map(e => e);

    try {
        // Set the values to the database
        set(ref(db, 'Notes/MyNotes ' + id), {
            values: values
        });

        return true
    }
    catch (e) {
        console.error(e)
    }
}
export function writeUserData({data}) {
    const id = Date.now();

    try {
        // Set the values to the database
        set(ref(db, 'items/' + id + '/'), {
            id: id,
            date: data.date,
            item: data.item,
            batchNumber: data.batchNumber
        });

        return true
    }
    catch (e) {
        console.error(e)
    }

    return true
}
