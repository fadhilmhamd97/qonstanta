import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { getTryoutScheduleById } from "../tryout-services"
import { Link } from "react-router-dom"

const TryoutEditScheduleComponent = ({propTryoutPacket, delegateScheduleEvent, currentContextId}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        tryoutPacketId: undefined
    })

    useEffect(() => {
        delegateScheduleEvent(propFormDetailData)
    }, [propFormDetailData])

    useEffect(() => {
        getTryoutScheduleById(currentContextId).then(res => {
            const {name, tryoutPacketId} = res.data.data
            setFormDetailData({name, tryoutPacketId})
        })
    },[])
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Nama Paket
                </Label>
                <Col md="8">
                    <Control type="text" value={propFormDetailData.name} onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama Paket" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Paket Try Out
                </Label>
                <Col md="4">
                    <Control as="select" defaultValue="0" onChange={ev => setFormDetailData({...propFormDetailData, tryoutPacketId: parseInt(ev.currentTarget.value)})}>
                        <option value="0">-- Pilih Paket --</option>
                        {propTryoutPacket.map((v, i) => {
                            if(v['id'] === propFormDetailData['tryoutPacketId']) return(<option key={i} selected={true} value={v['id']}>{v['code']}</option>) 
                            else return(<option key={i} value={v['id']}>{v['code']}</option>)
                        })}
                    </Control>
                </Col>
                <Col md="4">
                    <Link to="/admin/tryout/packet-type">
                        <Button variant="success">Tambah Paket Tryout</Button>
                    </Link>
                </Col>
            </Group>
        </Form>
    </>)
}

export default TryoutEditScheduleComponent