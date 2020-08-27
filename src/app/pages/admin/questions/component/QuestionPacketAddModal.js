import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { getFormulaList } from "../question-service";

const QuestionPacketAddModalComponent = ({propQuestionPacketType, propCurrentTreeContext ,delegateQuestionPacketEvent}) => {
    const {Group, Label, Control, Check} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        questionTotal: undefined,
        duration: undefined,
        description: undefined,
        publish: false,
        isActive: false,
        questionPacketTypeId: undefined,
        formulaId: undefined,
        hierarchyId: propCurrentTreeContext === undefined ? 0 : propCurrentTreeContext['id']
    })

    const [propFormulaList, setFormulaList] = useState([])
    const [propPublishCondition, setPublishCondition] = useState(false)
    const [propActiveCondition, setActiveCondition] = useState(false)

    useEffect(() => {
        delegateQuestionPacketEvent(propFormDetailData)
    }, [propFormDetailData])

    useEffect(() => {
        populateFormula()
    },[])

    const populateFormula = async () => {
        getFormulaList().then(res => {
            const {data} = res.data
            setFormulaList(data)
        })
    }
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Nama Paket
                </Label>
                <Col md="8">
                    <Control type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Deskripsi
                </Label>
                <Col md="8">
                    <Control type="text" onChange={ev => setFormDetailData({...propFormDetailData, description: ev.target.value})} placeholder="Deskripsi" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Tipe Paket Soal
                </Label>
                <Col md="8">
                    <Control as="select" defaultValue="0" onChange={ev => setFormDetailData({...propFormDetailData, questionPacketTypeId: parseInt(ev.currentTarget.value)})}>
                        <option value="0">-- Pilih Tipe Paket Soal --</option>
                        {propQuestionPacketType.map((v, i) => {
                            return(<option key={i} value={v['id']}>{`${v['code']}`}</option>)
                        })}
                    </Control>
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Formula
                </Label>
                <Col md="8">
                    <Control as="select" defaultValue="0" onChange={ev => setFormDetailData({...propFormDetailData, formulaId: parseInt(ev.currentTarget.value)})}>
                        <option value="0">-- Pilih Formula --</option>
                        {propFormulaList.map((v, i) => {
                            return(<option key={i} value={v['id']}>{`${v['code']}`}</option>)
                        })}
                    </Control>
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Total Pertanyaan
                </Label>
                <Col md="8">
                    <Control type="number" onChange={ev => setFormDetailData({...propFormDetailData, questionTotal: parseInt(ev.target.value)})} placeholder="Total" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Durasi
                </Label>
                <Col md="8">
                    <Control type="number" onChange={ev => setFormDetailData({...propFormDetailData, duration: parseInt(ev.target.value)})} placeholder="Durasi" />
                </Col>
            </Group>
            <Group as={Row}>
                <Col md="6">
                    <Check label="Publish" onChange={() => {const data = !propPublishCondition; setPublishCondition(data); setFormDetailData({...propFormDetailData, publish: data}) }} />
                </Col>
                <Col md="6">
                    <Check label="Aktif" onChange={() => {const data = !propActiveCondition; setActiveCondition(data); setFormDetailData({...propFormDetailData, isActive: data}) }} />
                </Col>
            </Group>
        </Form>
    </>)
}

export default QuestionPacketAddModalComponent