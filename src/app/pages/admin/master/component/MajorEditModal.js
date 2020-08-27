import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getMajorById } from "../master-services";

const MajorEditComponent = ({delegateMajorEvent, currentContextId}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: ''
    })

    useEffect(() => {
        delegateMajorEvent(propFormDetailData)
    }, [propFormDetailData])

    useEffect(() => {
        populateMajorDetail(currentContextId)
    },[])

    const populateMajorDetail = async id => {
        getMajorById(id).then(res => {
            const {data} = res.data
            setFormDetailData(data)
        })
    }
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Kode
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['code']} type="text" disabled={true} />
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

export default MajorEditComponent