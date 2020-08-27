import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import * as service from "../master-services";

const FormulaEditComponent = ({delegateFormulaEvent, currentContextId}) => {
    const {Group, Label, Control, Check} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        correctPoint: undefined,
        wrongPoint: undefined,
        isActive: false
    })

    const [propFormulaCondition, setFormulaCondition] = useState(false)

    useEffect(() => {
        delegateFormulaEvent(propFormDetailData)
    }, [propFormDetailData])

    useEffect(() => {
        service.getFormulaById(currentContextId).then(res =>{
            const {name, correctPoint, wrongPoint, isActive} = res.data.data
            setFormDetailData({name, correctPoint: parseInt(correctPoint), wrongPoint: parseInt(wrongPoint), isActive})
            setFormulaCondition(isActive)
        })
    },[])
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Nama
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['name']} type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Nilai Benar
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['correctPoint']} type="number" onChange={ev => setFormDetailData({...propFormDetailData, correctPoint: parseInt(ev.target.value)})} placeholder="Nilai Benar" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Nilai Salah
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['wrongPoint']} type="number" onChange={ev => setFormDetailData({...propFormDetailData, wrongPoint: parseInt(ev.target.value)})} placeholder="Nilai Salah" />
                </Col>
            </Group>
            <Group as={Row}>
                <Check style={{marginLeft: '1em'}} label="Tandai sebagai Aktif" onChange={() => {const data = !propFormulaCondition; setFormulaCondition(data); setFormDetailData({...propFormDetailData, isActive: data}) }} />
            </Group>
        </Form>
    </>)
}

export default FormulaEditComponent