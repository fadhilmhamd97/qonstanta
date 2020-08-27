import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const FormulaAddComponent = ({delegateFormulaEvent}) => {
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
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Nama
                </Label>
                <Col md="8">
                    <Control type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Nilai Benar
                </Label>
                <Col md="8">
                    <Control type="number" onChange={ev => setFormDetailData({...propFormDetailData, correctPoint: ev.target.value})} placeholder="Nilai Benar" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Nilai Salah
                </Label>
                <Col md="8">
                    <Control type="number" onChange={ev => setFormDetailData({...propFormDetailData, wrongPoint: ev.target.value})} placeholder="Nilai Salah" />
                </Col>
            </Group>
            <Group as={Row}>
                <Check style={{marginLeft: '1em'}} label="Publish" onChange={() => {const data = !propFormulaCondition; setFormulaCondition(data); setFormDetailData({...propFormDetailData, isActive: data}) }} />
            </Group>
        </Form>
    </>)
}

export default FormulaAddComponent