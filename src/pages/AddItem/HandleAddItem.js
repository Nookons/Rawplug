import {getStatusLabel} from "./AnyFunction";
import {writeUserData} from "../../utils/DataBase";
import {message} from "antd";
import {getImg} from "./GetItemImg";
import {getBatchNumber} from "./getBatchNumber";
import {getAdditionalImg} from "./getAdditionalImg";

export const handleAddItem = async ({item, setCurrent, lastNumber}) => {

    console.log(item)

    const data = {
        name: item.name ? item.name : 'Unknown',
        type: item.type ? item.type : 'Unknown',
        deliveredDate: item.deliveredDate || 'Unknown',
        imgUrl: getImg({item}),
        additionalImg: getAdditionalImg({item}),
        batchNumber: getBatchNumber({item, lastNumber}),
        location: item.currentLocation ? item.currentLocation.join('-') : 'Unknown',
        status: {
            label: getStatusLabel(item.status),
            status: item.status || 'Unknown',
        }
    };

    console.log(data)
    const response = await writeUserData({data: data});

    if (response) {
        message.success('Item was added!')
        return response
    } else {
        message.error('Something wrong!')
    }
};