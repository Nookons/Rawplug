import {getDatabase, ref, set, push} from "firebase/database";

export function writeUserData({data}) {
    const db = getDatabase();
    const id = Date.now();

    // Extract the 'value' property from each object using map
    const values = data.map(e => e);

    // Set the values to the database
    set(ref(db, 'Notes/MyNotes ' + id), {
        values: values
    });
}