import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { getTryoutPacketDetailById } from "../tryout-services";

const TryoutEditPacketComponent = ({propTryoutPacketType,delegateScheduleEvent, currentContextId}) => {
    const {Group, Label, Control} = Form

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        price: undefined,
        priceMember: undefined,
        freeLimit: 0,
        discount: 0,
        expiredAt: undefined,
        tryoutPacketTypeId: undefined
    })

    useEffect(() => {
        delegateScheduleEvent(propFormDetailData)
    }, [propFormDetailData])

    useEffect(() => {
        getTryoutPacketDetailById(currentContextId).then(res => {
            const {name, price, priceMember, freeLimit, discount, expiredAt, tryoutPacketTypeId} = res.data.data
            setFormDetailData({name, price: parseFloat(price).toFixed(2), priceMember: parseFloat(priceMember).toFixed(2), freeLimit, discount, expiredAt, tryoutPacketTypeId})
        })
    },[])
    
    return(<>
        <Form>
            <Group as={Row}>
                <Label column md="4">
                    Nama Paket
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['name']} type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama Paket" />
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
                            if(v['id'] === propFormDetailData['tryoutPacketTypeId']) return(<option key={i} selected={true} value={v['id']}>{v['code']}</option>) 
                            else return(<option key={i} value={v['id']}>{v['code']}</option>)
                        })}
                    </Control>
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Harga Paket
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['price']} type="number" onChange={ev => setFormDetailData({...propFormDetailData, price: parseFloat(ev.target.value).toFixed(2)})} placeholder="Harga Paket" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Harga Member
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['priceMember']} type="number" onChange={ev => setFormDetailData({...propFormDetailData, priceMember: parseFloat(ev.target.value).toFixed(2)})} placeholder="Harga Member" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Diskon
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['discount']} type="number" onChange={ev => setFormDetailData({...propFormDetailData, discount: ev.target.value})} placeholder="Diskon Tryout" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Batas Gratis
                </Label>
                <Col md="8">
                    <Control value={propFormDetailData['freeLimit']} type="number" onChange={ev => setFormDetailData({...propFormDetailData, freeLimit: ev.target.value})} placeholder="Batas Gratis Tryout" />
                </Col>
            </Group>
            <Group as={Row}>
                <Label column md="4">
                    Tanggal Berakhir Pendaftaran
                </Label>
                <Col md="8">
                    <Control type="date" onChange={ev => setFormDetailData({...propFormDetailData, expiredAt: ev.currentTarget.value})} />
                </Col>
            </Group>
        </Form>
    </>)
}

export default TryoutEditPacketComponent