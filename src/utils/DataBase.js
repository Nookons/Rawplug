import {getDatabase, ref, onValue, remove, update} from "firebase/database";
import {db} from "../firebase";

export function writeUserAction({data}) {
    const template = {
        id: data.id,
        by: 'Kolomiiets Dmytro',
        actionType: data.actionType,
        timeStamp: data.timeStamp
    }

    const updates = {};
    const path = 'main/action/' + data.id;
    updates[path] = template;

    return new Promise((resolve, reject) => {
        update(ref(db), updates)
            .then(() => resolve(template))
            .catch((error) => reject(error));
    });
}

export function writeUserData({ data }) {
    const id = Date.now();

    const template = {
        id: id,
        date: '22-10-2023',
        mixingDate: '14-10-2023',
        timeStamp: data && data.timeStamp !== undefined ? data.timeStamp : 'Test',
        name: data && data.name ? data.name : 'Test',
        type: data && data.type ? data.type : 'Test',
        location: data && data.location ? data.location : 'A-2-3 Test',
        batchNumber: data && data.batchNumber ? data.batchNumber : '19233 Test',
        imgUrl: 'https://atlas-content-cdn.pixelsquid.com/stock-images/metal-barrel-steel-y1ME6PC-600.jpg',
        status: {
            label: 'Available',
            status: 'Available'
        }
    };

    console.log(template);

    const updates = {};
    const path = `main/items/${data.type ? data.type.toLowerCase() : 'barrel'}/${id}`;
    updates[path] = template;

    return new Promise((resolve, reject) => {
        update(ref(db), updates)
            .then(() => resolve(template))
            .catch((error) => reject(error));
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

export function getItem({ type, id}) {
    const starCountRef = ref(db, 'main/items/' + type + '/' + id);

    return new Promise((resolve, reject) => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

export function removeItem({element}) {
    const path = ref(db, `main/items/${element ? element.type + '/' : 'Barrel/'}${element.id}`);

    return new Promise((resolve, reject) => {
        remove(path).then(() => {
            resolve(true);
        }).catch((error) => {
            reject([false, error]);
        });
    });
}


