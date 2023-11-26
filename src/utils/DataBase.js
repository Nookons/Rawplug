import {getDatabase, ref, onValue, remove, update} from "firebase/database";
import {db} from "../firebase";
import dayjs from "dayjs";

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
    const timeStamp = dayjs().toString()

    const template = {
        id: id,
        date: timeStamp,
        deliveredDate: data && data.deliveredDate ? data.deliveredDate : 'unknown',
        timeStamp: timeStamp,
        name: data && data.name ? data.name : 'unknown',
        type: data && data.type ? data.type : 'unknown',
        form: data && data.name == "KRP-R-NOZ-100-Z" ? 'NOZZLEX8' : null,
        quantity: data && data.name == "KRP-R-NOZ-100-Z" ? 8723 : null,
        location: data && data.location ? data.location : 'unknown',
        batchNumber: data && data.batchNumber ? data.batchNumber : null,
        imgUrl: data ? data.imgUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png',
        additionalImg: data ? data.additionalImg : null,
        status: {
            label: data.status.label,
            status: data.status.status
        }
    };

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
    const isArr = Array.isArray(data)

    return new Promise((resolve, reject) => {
        const updates = {};
        const date = new Date().toString();

        if (!isArr) {
            updates['/main/items/barrel/' + data + '/status/status'] = 'success';
            updates['/main/items/barrel/' + data + '/status/label'] = 'Used';
            update(dbRef, updates).then();
            resolve('All properties are defined');
        }
        else {
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
        }
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

    const path = ref(db, `main/items/${element ? element.type.toLowerCase() + '/' : 'barrel/'}${element.id}`);

    return new Promise((resolve, reject) => {
        remove(path).then(() => {
            resolve(true);
        }).catch((error) => {
            reject([false, error]);
        });
    });
}


