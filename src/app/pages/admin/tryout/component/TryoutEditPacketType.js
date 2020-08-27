import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { getTryoutPacketTypeById } from "../tryout-services";

const TryoutEditPacketTypeComponent = ({delegatePacketTypeEvent, currentContextId}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        code: ''
    })

    useEffect(() => {
        delegatePacketTypeEvent(propFormDetailData)
    }, [propFormDetailData])

    useEffect(() => {
        getTryoutPacketTypeById(currentContextId).then(res => {
            const {data} = res.data
            setFormDetailData(data)
        })
    },[])
    
    return(<>
            <Form>
            <Group as={Row}>
                <Label column md="4">
                    Kode
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['code']} disabled={true} type="text" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Nama
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['name']} type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama Paket" />
                </Col>
            </Group>
        </Form>
    </>)
}

export default TryoutEditPacketTypeComponent