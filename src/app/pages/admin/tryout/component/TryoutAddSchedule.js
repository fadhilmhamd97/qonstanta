import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const TryoutAddScheduleComponent = ({propTryoutPacket, delegateScheduleEvent}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        tryoutPacketId: undefined
    })

    useEffect(() => {
        delegateScheduleEvent(propFormDetailData)
    }, [propFormDetailData])
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Nama Paket
                </Label>
                <Col md="8">
                    <Control type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama Paket" />
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
                            return(<option value={v['id']}>{v['code']}</option>)
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

export default TryoutAddScheduleComponent