import React,{ useState, useEffect } from "react";
import { Card, ListGroup,Row, Col, Button } from "react-bootstrap";

import { getTryoutHistory } from "../../modules/History/_redux/tryout/tryoutCrud";

export function History(props) {

    const {Body, Title, Subtitle, Text, Link} = Card

    const [propHistory, setHistory] = useState([])

    useEffect(() => {
        getTryoutHistory().then(res => {
            setHistory([...res.data.data])
            console.info(propHistory)
        },
        err => {

        })
    }, [])

    //Component Validation
    const ListCard = ({props}) => {
        if(props.length > 0)
            return(<>
                {props.map((v, i) => {
                    const ButtonStatus = ({status}) => {
                        if(status === 'FREE')
                            return(<>
                                <Button style={{float: 'right'}} variant="success" size="sm" disabled>
                                    GRATIS
                                </Button>
                            </>)
                        if(status === 0)
                            return(<>
                                <Button style={{float: 'right'}} variant="danger" size="sm" disabled>
                                    BELUM DIBAYAR
                                </Button>
                            </>)
                        if(status === 1)
                            return(<>
                                <Button style={{float: 'right'}} variant="primary" size="sm" disabled>
                                    SUDAH DIBAYAR
                                </Button>
                            </>)
                    }

                    return(<>
                    <ListGroup.Item style={{padding: .1 + 'em'}}>
                    <Card>
                        <Title style={{padding: .7 + 'em', backgroundColor: 'blue', color: 'white'}}>{v['orderTryout_code']}</Title>
                        <Body>
                            <Row style={{marginTop: '-2em'}}>
                                <Col xs={3}><b>Kode Order</b></Col>
                                <Col xs={6}>{v['orderTryout_schoolName']}</Col>
                                <Col xs={3}>
                                    <ButtonStatus status={v['orderTryout_paymentStatus']} />
                                </Col>
                            </Row>
                            <Row style={{marginTop: .5 + 'em'}}>
                                <Col xs={3}><b>Kode Paket</b></Col>
                                <Col xs={6}>{v['tryoutPacket_code']}</Col>
                            </Row>
                            <Row style={{marginTop: .5 + 'em'}}>
                                <Col xs={3}><b>Asal Sekolah</b></Col>
                                <Col xs={6}>{v['orderTryout_schoolName']}</Col>
                            </Row>
                            <Row style={{marginTop: .5 + 'em'}}>
                                <Col xs={3}><b>Harga</b></Col>
                                <Col xs={6}>{v['orderTryout_paymentAmount']}</Col>
                            </Row>
                            <Row style={{marginTop: .5 + 'em'}}>
                                <Col xs={3}><b>Jadwal</b></Col>
                                <Col xs={6}>{v['tryoutSchedule_name']}</Col>
                            </Row>
                        </Body>
                    </Card>
                </ListGroup.Item>
                </>)})}
            </>)
        else
            return(<>
                <Card>
                    <Body>Anda belum melakukan pendaftaran paket tryout manapun</Body>
                </Card>
            </>)
    }

    return(<>
        <Card>
        <ListGroup variant="flush">
            <ListCard props={propHistory} />
        </ListGroup>
        </Card>
    </>)
}

export default History