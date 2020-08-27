import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

const QuestionPacketTypeAddModalComponent = ({delegateScheduleEvent}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: ''
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
        </Form>
    </>)
}

export default QuestionPacketTypeAddModalComponent