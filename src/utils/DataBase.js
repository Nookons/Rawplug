import {getDatabase, ref, set, push, onValue, update, child} from "firebase/database";
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
    const db = getDatabase();

    const postData = {
        id: id,
        date: '22-10-2023',
        mixingDate: '14-10-2023',
        name: 'PSF-FR',
        type: 'Cart',
        location: 'A-1-0-1',
        batchNumber: '19342',
        status: 'Approved'
    };

    const newPostKey = push(child(ref(db), postData.type)).key;
    const updates = {};
    updates['main/items/' + postData.type + '/' + newPostKey] = postData;

    return update(ref(db), updates);
}
