import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import * as service from "../tryout-services"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TryoutAddDetailScheduleComponent = ({delegateDetailEvent, contextScheduleId}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        datetimeCheckin: new Date(),
        datetimeStart: new Date(),
        datetimeEnd: new Date(),
        tryoutScheduleId: parseInt(contextScheduleId),
        questionPacketId: undefined
    })

    const [propQuestionPacketList, setQuestionPacketList] = useState([])

    const [propCheckIn, setCheckIn] = useState(new Date())
    const [propStart, setStart] = useState(new Date())
    const [propEnd, setEnd] = useState(new Date())

    useEffect(() => {
        delegateDetailEvent(propFormDetailData)
    }, [propFormDetailData])

    useEffect(() => {
        populateQuestionPacketList()
    },[])

    const populateQuestionPacketList = async () => {
        service.getQuestionPacketList().then(res => {
            const {data} = res.data
            setQuestionPacketList(data)
        })
    }
    
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
            <Group as={Row}>
                <Label column md="4">
                    Paket Soal
                </Label>
                <Col md="8">
                    <Control as="select" defaultValue="0" onChange={ev => setFormDetailData({...propFormDetailData, questionPacketId: parseInt(ev.currentTarget.value)})}>
                        <option value="0">-- Pilih Jenis Paket --</option>
                        {propQuestionPacketList.map((v, i) => {
                            return(<option value={v['id']}>{v['code']}</option>)
                        })}
                    </Control>
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Waktu Check In
                </Label>
                <Col md="8">
                    <DatePicker
                        selected={propCheckIn}
                        onChange={date => {setCheckIn(date); setFormDetailData({...propFormDetailData, datetimeCheckin: date.toISOString() }) }}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm"
                    />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Waktu Mulai
                </Label>
                <Col md="8">
                    <DatePicker
                        selected={propStart}
                        onChange={date => {setStart(date); setFormDetailData({...propFormDetailData, datetimeStart: date.toISOString()})}}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm"
                    />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Waktu Berakhir
                </Label>
                <Col md="8">
                    <DatePicker
                        selected={propEnd}
                        onChange={date => {setEnd(date); setFormDetailData({...propFormDetailData, datetimeEnd: date})}}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm"
                    />
                </Col>
            </Group>
        </Form>
    </>)
}

export default TryoutAddDetailScheduleComponent