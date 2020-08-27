import React from "react"
import { Container, Card, Form, Row, Col } from "react-bootstrap"
import { TextField } from '@material-ui/core'

import { polaSelectData } from "../_data";

const FilterFormControlsComponent = ({props}) => {
    
    const {Body} = Card
    const {Group, Control, Label, Text} = Form

    return(<Card>
        <Body>
            <Form>
                <Row>
                    <Col md="4">
                        <Group>
                            <Label>Pola</Label>
                            <Control as="select">
                                {polaSelectData.map(v => {
                                    return(<option value={v['value']}>
                                        {v['description']}
                                    </option>)
                                })}
                            </Control>
                        </Group>
                    </Col>
                    <Col md="4">
                        <Group>
                            <Label>Jadwal</Label>
                            <TextField
                                className="form-control"
                                id="date"
                                type="date"
                                defaultValue="2017-05-24"
                            />
                        </Group>
                    </Col>
                    <Col md="4">
                        <Group>
                            <Label>Pengajar</Label>
                            <Control as="text" placeholder="Nama Pengajar" />
                        </Group>
                    </Col>
                </Row>
            </Form>
        </Body>
    </Card>)
}

export default FilterFormControlsComponent