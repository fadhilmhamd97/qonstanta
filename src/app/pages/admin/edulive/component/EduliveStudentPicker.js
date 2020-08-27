import React from "react"
import { Form, Row, Col } from "react-bootstrap"
import { MaterialTable } from "../../../../shared/common/index"

import { studentColumnsData, studentTableData } from "../_data";

const EduliveStudentPickerComponent = ({props}) => {

    const {Group, Label, Control} = Form

    const actions = ['add']

    return(<>
        <Form>
            <Group>
                <Label>Siswa berdasarkan pola</Label>
                <Control as="select">
                    <option>Pola I</option>
                    <option>Pola II</option>
                </Control>
            </Group>
        </Form>
        <MaterialTable actions={actions} datasets={studentTableData} columns={studentColumnsData} />
    </>)
}

export default EduliveStudentPickerComponent