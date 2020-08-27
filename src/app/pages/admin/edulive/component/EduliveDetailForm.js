import React,{useState} from "react"
import { Container, Form, Row, Col } from "react-bootstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createEduliveTeacherData, moduleSelectData } from "../_data";

const EduliveDetailFormComponent = ({props}) => {
    const {Group, Control, Label} = Form

    const [startDate, setStartDate] = useState(
        new Date()
    );

    return(<Container>
            <Form>
                <Group as={Row}>
                    <Label column md="4">Nama Sesi Kelas</Label>
                    <Col md="8">
                        <Control type="text" placeholder="Sesi Kelas" />
                    </Col>
                </Group>
                <Group as={Row}>
                    <Label column md="4">Pengajar</Label>
                    <Col md="8">
                        <Select options={createEduliveTeacherData} />
                    </Col>
                </Group>
                <Group as={Row}>
                    <Label column md="4">Mata Pelajaran</Label>
                    <Col md="8">
                        <Select options={moduleSelectData} />
                    </Col>
                </Group>
                <Group as={Row}>
                    <Label column md="4">Jadwal Mengajar</Label>
                    <Col md="8">
                    <DatePicker
                        className="form-control"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </Col>
                </Group>
            </Form>
    </Container>)
}

export default EduliveDetailFormComponent