import React, {useState} from 'react';
import MyModal from "./MyModal/MyModal";
import {Input, Select} from "antd";
import {set} from "firebase/database";
import {updateUserData} from "../utils/DataBase";
import MyButton from "./MyButton/MyButton";

const ChangeModal = ({visible, setVisible, item}) => {

    const [name, setName] = useState(item ? item.name : null);
    const [type, setType] = useState(item ? item.type : null);
    const [mixingDate, setMixingDate] = useState(null);
    const [date, setDate] = useState(null);
    const [status, setStatus] = useState(item ? item.status.status : null);


    async function update() {
        let userInput = prompt('Enter Password');

        if (userInput === '2486') {
            const data = {
                id: item.id,
                name: !name ? item.name : name,
                type: !type ? item.type: type,
                status: !status ? item.status.status : status
            }
            const response = await updateUserData({data})
            setVisible(false)
        }
        else {
            setVisible(false)
            alert('Password not correctly')
        }
    }

    return (
        <div>
            {visible
                ?
                <MyModal
                    visible={visible}
                    setVisible={setVisible}
                >
                    <h4>{name}</h4>
                    <Input value={name} onChange={e => setName(e.target.value)} addonBefore="Name" placeholder={item.name} />
                    <Input value={type} onChange={e => setType(e.target.value)} addonBefore="Type" placeholder={item.type} />
                    <Input value={mixingDate} onChange={e => setName(e.target.value)} disabled addonBefore="Mixing Date" placeholder={item.mixingDate} />
                    <Input value={date} onChange={e => setName(e.target.value)} disabled addonBefore="Last change" placeholder={item.date} />
                    <article>Status</article>
                    <Select
                        defaultValue={item.status.label}
                        style={{ width: '100%' }}
                        allowClear
                        value={!status ? item.status.label : status}
                        onChange={e => setStatus(e)}
                        options={[
                            { value: 'success', label: 'Used' },
                            { value: 'processing', label: 'Available' },
                            { value: 'error', label: 'Hold' },
                        ]}
                    />
                    <MyButton click={update}>Save</MyButton>
                </MyModal>
                :
                <MyModal
                    visible={visible}
                    setVisible={setVisible}
                >
                    Nothing here
                </MyModal>
            }
        </div>
    );
};

export default ChangeModal;