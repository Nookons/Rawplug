import {onValue} from "firebase/database";

export async function getLastButchNumber({barrel, setLastNumber}) {
    const allButch = []

    if(barrel) {
        barrel.forEach(e => {
            // Преобразовываем значение в число перед добавлением в массив
            allButch.push(parseInt(e.batchNumber, 10));
        })
    }

    // Найдем самый большой номер в массиве
    const clearNaN = allButch.filter((e) => !isNaN(e));
    const largestNumber = Math.max(...clearNaN);

    return new Promise((resolve, reject) => {
        if (!isNaN(largestNumber)) {
            resolve(largestNumber);
        } else {
            reject(new Error("largestNumber is NaN"));
        }
    });
}