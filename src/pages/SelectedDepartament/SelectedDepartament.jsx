import React, {useCallback} from 'react';
import {Departments} from "../../utils/Options";
import {Avatar, Card, Skeleton} from "antd";
import styles from "../Home/Home.module.css";
import Meta from "antd/es/card/Meta";
import { useNavigate } from 'react-router-dom';

const SelectedDepartment = () => {
    const navigate = useNavigate();

    const onCardClick = useCallback((event) => {
        const label = event.target.closest('.card').id;

        switch (label) {
            case 'Mixing Department' :
                navigate('/pick-dep/mixing-dep')
                break;
            case 'Warehouse Department' :
                navigate('/pick-dep/warehouse')
                break;
            default :
                break;
        }
    }, []);

    return (
        <div style={{minHeight: 'calc(100dvh - 78px - 76px)', padding: 50}}>
            {Departments
                ?
                <div style={{display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                    {
                        Departments.map((element, index) => {

                            return (
                                <Card id={element.label} className={'card ' + styles.Card} onClick={onCardClick} >
                                    <Skeleton loading={false} avatar active>
                                        <div className={styles.cardWrapper} >
                                            <Avatar src={element.imgUrl} size={{xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100}}>
                                                Department image
                                            </Avatar>
                                            <Meta title={element.label} description={element.description}/>
                                        </div>
                                    </Skeleton>
                                </Card>
                            )
                        })
                    }
                </div>
                :
                <div>

                </div>
            }
        </div>
    );
};

export default SelectedDepartment;