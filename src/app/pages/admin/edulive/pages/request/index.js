import React,{ useState } from "react"
import { MaterialTable, BootstrapModalHelper } from "../../../../../shared/common/index"
import { Container, Card, Form, Col, Row } from "react-bootstrap"
import { eduliveRequestColumns, eduliveRequestDatasets } from "../../_data"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { EduliveStudentPickerComponent } from "../../component/index";
import { useHistory } from "react-router-dom"

const EduliveRequest = ({props}) => {
    const {Title, Header, Body} = Card
    const {Control, Group, Label} = Form

    const [startDate, setStartDate] = useState(
        new Date()
    );

    const history = useHistory();

    const [propRequestEditModal, setRequestEditModal] = useState(false)

    return(<Container>
        <Card>
            <Header>
                <Title>Daftar Kelas EduLive</Title>
            </Header>
            <Body>
                <Form>
                    <Row>
                        <Col md="4">
                            <Group>
                                <Label>Tanggal</Label>
                                <br />
                                <DatePicker
                                    className="form-control"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </Group>
                        </Col>
                        <Col md="4">
                            <Group>
                                <Label>Pola</Label>
                                <Control as="select">
                                    <option>Pola I | Setiap Senin | 08.00-12.00</option>
                                    <option>Pola II | Setiap Selasa | 08.00-12.00</option>
                                </Control>
                            </Group>
                        </Col>
                        <Col md="4">
                            <Group>
                                <Label>Pengajar</Label>
                                <Control type="text" placeholder="Pengajar" />
                            </Group>
                        </Col>
                    </Row>
                </Form>
                <MaterialTable 
                    actions={['edit']} 
                    columns={eduliveRequestColumns}
                    datasets={eduliveRequestDatasets}
                    handleEditAction={() => history.push('/admin/edulive/request/edit?id=1')}
                />
            </Body>
        </Card>
    </Container>)
}

export default EduliveRequest