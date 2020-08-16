import React,{ useState, useEffect } from "react";
import { Card, ListGroup,Row, Col, Button } from "react-bootstrap";
import { ListCard } from "./component/index";
import { MaterialTable } from "../../shared/common/index";

import { getTryoutHistory } from "../../modules/History/_redux/tryout/tryoutCrud";

const columns = [
    {
        title: 'Kode Order',
        value: 'orderTryout_code'
    },
    {
        title: 'Kode Paket',
        value: 'tryoutPacket_code'
    },
    {
        title: 'Nama Paket',
        value: 'tryoutPacket_name'
    },
    {
        title: 'Asal Sekolah',
        value: 'orderTryout_schoolName'
    },
    {
        title: 'Harga',
        value: 'orderTryout_paymentAmount'
    },
    {
        title: 'Jadwal',
        value: 'tryoutSchedule_name'
    }
]

export function History(props) {

    const [propHistory, setHistory] = useState([])

    useEffect(() => {
        getTryoutHistory().then(res => {
            setHistory([...res.data.data])
            console.info(propHistory)
        },
        err => {

        })
    }, [])

    return(<>
        <Card>
            <MaterialTable 
                columns={columns}
                datasets={propHistory}
                actions={{view: 1, edit: 1, del: 1}}
            />
        </Card>
    </>)
}

export default History