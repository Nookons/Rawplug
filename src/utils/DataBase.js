import {getDatabase, ref, set, push, onValue, remove, update, child} from "firebase/database";
import {db} from "../firebase";
import {useObject} from "react-firebase-hooks/database";
import {useState} from "react";

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
    } catch (e) {
        console.error(e)
    }
}

export function writeUserData({data}) {
    const id = Date.now();
    const db = getDatabase();
    const date = new Date().toString();

    const postData = {
        id: id,
        date: '22-10-2023',
        mixingDate: '14-10-2023',
        changeDate: date,
        name: 'PSF-FR',
        type: 'Barrel',
        location: 'A-1-0-1',
        batchNumber: '19342',
        imgUrl: 'https://atlas-content-cdn.pixelsquid.com/stock-images/metal-barrel-steel-y1ME6PC-600.jpg',
        status: {
            label: 'Avviable',
            status: 'success'
        }
    };

    const newPostKey = push(child(ref(db), postData.type)).key;
    const updates = {};
    updates['main/items/' + postData.type + '/' + postData.id] = postData;

    return update(ref(db), updates);
}

export function updateUserData({data}) {
    const dbRef = ref(getDatabase());

    return new Promise((resolve, reject) => {
        console.log(data)
        const updates = {};
        const date = new Date().toString();

        console.log(date)
        updates['/main/items/Cart/' + data.id + '/name'] = data.name;
        updates['/main/items/Cart/' + data.id + '/type'] = data.type;
        updates['/main/items/Cart/' + data.id + '/status/status'] = data.status;
        console.log(data.status)
        if (data.status === 'success') {
            updates['/main/items/Cart/' + data.id + '/status/label'] = 'Used';
        }
        if (data.status === 'processing') {
            updates['/main/items/Cart/' + data.id + '/status/label'] = 'Available';
        }
        if (data.status === 'error') {
            updates['/main/items/Cart/' + data.id + '/status/label'] = 'Hold';
        }

        updates['/main/items/Cart/' + data.id + '/changeDate'] = date;

        update(dbRef, updates).then();
        resolve('All properties are defined');
    });


    // const updates = {};
    // updates['/main/items/Cart/' + id + '/status/label'] = 'Used';
    // updates['/main/items/Cart/' + id + '/status/status'] = 'error';
    //
    // update(dbRef, updates).then();
}

export function getItem({id}) {
    const starCountRef = ref(db, 'main/items/Barrel/' + id);

    return new Promise((resolve, reject) => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}
export function removeItem({ id }) {
    const starCountRef = ref(db, 'main/items/Cart/' + id);

    return new Promise((resolve, reject) => {
        remove(starCountRef).then(() => {
            resolve('Запись успешно удалена');
        }).catch((error) => {
            reject(error);
        });
    });
}


