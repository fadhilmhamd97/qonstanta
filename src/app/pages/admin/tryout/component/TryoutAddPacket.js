import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"

const TryoutAddPacketComponent = ({propTryoutPacketType,delegateScheduleEvent}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        price: undefined,
        priceMember: undefined,
        freeLimit: undefined,
        discount: undefined,
        expiredAt: undefined,
        tryoutPacketTypeId: undefined
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
                    Jenis Paket Tryout
                </Label>
                <Col md="8">
                    <Control as="select" defaultValue="0" onChange={ev => setFormDetailData({...propFormDetailData, tryoutPacketTypeId: parseInt(ev.currentTarget.value)})}>
                        <option value="0">-- Pilih Jenis Paket --</option>
                        {propTryoutPacketType.map((v, i) => {
                            return(<option value={v['id']}>{v['code']}</option>)
                        })}
                    </Control>
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Harga Paket
                </Label>
                <Col md="8">
                    <Control type="number" onChange={ev => setFormDetailData({...propFormDetailData, price: parseFloat(ev.target.value).toFixed(2)})} placeholder="Harga Paket" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Harga Member
                </Label>
                <Col md="8">
                    <Control type="number" onChange={ev => setFormDetailData({...propFormDetailData, priceMember: parseFloat(ev.target.value).toFixed(2)})} placeholder="Harga Member" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Diskon
                </Label>
                <Col md="8">
                    <Control type="number" onChange={ev => setFormDetailData({...propFormDetailData, discount: parseInt(ev.target.value)})} placeholder="Diskon Tryout" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Batas Gratis
                </Label>
                <Col md="8">
                    <Control type="number" onChange={ev => setFormDetailData({...propFormDetailData, freeLimit: parseInt(ev.target.value)})} placeholder="Batas Gratis Tryout" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Tanggal Berakhir Pendaftaran
                </Label>
                <Col md="8">
                    <Control type="date" onChange={ev => setFormDetailData({...propFormDetailData, expiredAt: new Date(ev.currentTarget.value).toISOString()})} />
                </Col>
            </Group>
        </Form>
    </>)
}

export default TryoutAddPacketComponent