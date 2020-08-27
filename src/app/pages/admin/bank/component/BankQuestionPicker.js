import React from "react"
import { Form, Row, Col } from "react-bootstrap"
import { MaterialTable } from "../../../../shared/common/index"

import { postTestModuleColumns, postTestModuleData } from "../_data";

const BankQuestionPickerComponent = ({props}) => {

    const {Group, Label, Control} = Form

    const actions = ['add']

    return(<>
        <Form>
            <Group>
                <Label>Paket Soal</Label>
                <Control as="select">
                    <option>Paket Try Out I</option>
                    <option>Paket Try Out II</option>
                    <option>Paket Try Out III</option>
                </Control>
            </Group>
        </Form>
        <MaterialTable actions={actions} datasets={postTestModuleData} columns={postTestModuleColumns} />
    </>)
}

export default BankQuestionPickerComponent