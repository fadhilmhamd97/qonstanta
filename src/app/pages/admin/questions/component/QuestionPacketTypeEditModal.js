import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { getQuestionTypeById } from "../question-service";

const QuestionPacketTypeEditModalComponent = ({delegateScheduleEvent, currentContextId}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        code: ''
    })

    useEffect(() => {
        delegateScheduleEvent(propFormDetailData)
    }, [propFormDetailData])

    useEffect(() => {
        getQuestionTypeById(currentContextId).then(res => {
            const {name, code } = res.data.data
            setFormDetailData({name, code})
        })
    },[])
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Kode Paket
                </Label>
                <Col md="8">
                    <Control disabled={true} value={propFormDetailData['code']} type="text" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Nama Paket
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['name']} type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama Paket" />
                </Col>
            </Group>
        </Form>
    </>)
}

export default QuestionPacketTypeEditModalComponent