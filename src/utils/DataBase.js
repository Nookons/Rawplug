import {getDatabase, ref, set, push, onValue, remove, update, child} from "firebase/database";
import {db} from "../firebase";

export function writeUserData({ data }) {
    const id = Date.now();
    const db = getDatabase();
    const currentDate = new Date();

    console.log(data)

    const barrelTemplate = {
        id: id,
        date: data ? currentDate.toDateString() : 'Unknown',
        mixingDate: data ?  data.mixingDate : 'Unknown',
        changeDate: currentDate.toString(),
        name: data ? data.name : 'Unknown',
        type: data ? data.type : 'Unknown',
        location: data ? data.location : 'Unknown',
        batchNumber: data ? data.batchNumber.toString() : 'Unknown',
        imgUrl: 'https://atlas-content-cdn.pixelsquid.com/stock-images/metal-barrel-steel-y1ME6PC-600.jpg',
        status: {
            label: data ? data.status.label : 'Unknown',
            status: data ? data.status.status : 'Unknown'
        }
    };

    const updates = {};
    updates['main/items/' + (data ? data.type + '/' : 'Barrel/') + id] = barrelTemplate;

    return new Promise((resolve, reject) => {
        update(ref(db), updates)
            .then(() => {
                resolve(barrelTemplate);
            })
            .catch((error) => {
                reject(error);
            });
    });
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

export function removeItem({id}) {
    const path = ref(db, 'main/items/Barrel/' + id);

    return new Promise((resolve, reject) => {
        remove(path).then(() => {
            resolve(true);
        }).catch((error) => {
            reject([false, error]);
        });
    });
}


