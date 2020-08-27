import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const MajorAddComponent = ({delegateMajorEvent}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: ''
    })

    useEffect(() => {
        delegateMajorEvent(propFormDetailData)
    }, [propFormDetailData])
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Nama
                </Label>
                <Col md="8">
                    <Control type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama Paket" />
                </Col>
            </Group>
        </Form>
    </>)
}

export default MajorAddComponent