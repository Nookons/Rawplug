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

    // A post entry.
    const postData = {
        id: id,
        date: data.date,
        item: data.item,
        location: 'A-1-2',
        batchNumber: data.batchNumber
    };

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['items/' + newPostKey] = postData;

    return update(ref(db), updates);
}
