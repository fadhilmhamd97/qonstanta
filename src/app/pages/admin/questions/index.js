import React,{ useState } from "react"
import { Card, Container, Col, Row, Form, Button } from "react-bootstrap"
import { MaterialTable } from "../../../shared/common/index"
import { questionIndexColumns, questionIndexDatasets } from "./_data";

const MasterQuestions = ({props}) => {
    const {Body, Header, Title} = Card
    const {Label, Group, Control} = Form
    return(<Container>
        <Card>
            <Header>
                <Title>Daftar Module Pertanyaan</Title>
            </Header>
            <Body>
                <Row>
                    <Col md="3">
                        <Group>
                            <Label>Jurusan</Label>
                            <Control as="select">
                                <option>IPA</option>
                                <option>IPS</option>
                            </Control>
                        </Group>
                    </Col>
                    <Col md="3">
                        <Group>
                            <Label>Kelas</Label>
                            <Control as="select">
                                <option>X</option>
                                <option>XI</option>
                                <option>XII</option>
                            </Control>
                        </Group>
                    </Col>
                    <Col md="3">
                        <Group>
                            <Label>Mata Pelajaran</Label>
                            <Control as="select">
                                <option>Biologi</option>
                                <option>Kimia</option>
                                <option>Fisika</option>
                            </Control>
                        </Group>
                    </Col>
                    <Col md="3">
                        <Group>
                            <Label>Nama</Label>
                            <Control type="text" placeholder="Nama" />
                        </Group>
                    </Col>
                </Row>
                <Button style={{float: 'right', margin: '18px'}} variant="success">Tambah Paket</Button>
                <MaterialTable 
                    columns={questionIndexColumns}
                    datasets={questionIndexDatasets}
                    actions={['edit', 'delete']}
                />
            </Body>
        </Card>
    </Container>)
}

export default MasterQuestions