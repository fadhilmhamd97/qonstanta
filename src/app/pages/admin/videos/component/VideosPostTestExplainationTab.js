import React,{useState} from "react"
import { Container, Form, Col, Row, Button } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"

import { PostTestExplainationFormComponent } from "./index";

import { postTestData, columnsPostTest } from "../_data";

const VideosPostTestExplainationTabComponent = ({props, style}) => {
    const actions = ['edit','delete']

    const [propModalPickerAction, setModalPickerAction] = useState(false)

    return(<Container style={style}>
        <Button variant="primary" style={{float: 'right'}} onClick={() => setModalPickerAction(true)}>
            Tambah Pembahasan
        </Button>
        <MaterialTable actions={actions} columns={columnsPostTest} datasets={postTestData}  />

        <BootstrapModalHelper
            title="Tambah Pembahasan"
            propsAction={propModalPickerAction}
            delegateHideEvent={() => setModalPickerAction(false)}
            size="xl"
        >
            <PostTestExplainationFormComponent />
        </BootstrapModalHelper>
    </Container>)
}

export default VideosPostTestExplainationTabComponent