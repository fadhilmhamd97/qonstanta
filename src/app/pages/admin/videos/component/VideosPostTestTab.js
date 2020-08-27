import React,{useState} from "react"
import { Container, Form, Col, Row, Button } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"

import { PostTestPickerComponent } from "./index";

import { postTestData, columnsPostTest } from "../_data";

const VideosPostTestTabComponent = ({props, style}) => {
    const actions = ['edit','delete']

    const [propModalPickerAction, setModalPickerAction] = useState(false)

    return(<Container style={style}>
        <Button variant="primary" style={{float: 'right'}} onClick={() => setModalPickerAction(true)}>
            Tambah Post Test
        </Button>
        <MaterialTable actions={actions} columns={columnsPostTest} datasets={postTestData}  />

        <BootstrapModalHelper
            title="Tambah Soal"
            propsAction={propModalPickerAction}
            delegateHideEvent={() => setModalPickerAction(false)}
            size="xl"
        >
            <PostTestPickerComponent />
        </BootstrapModalHelper>
    </Container>)
}

export default VideosPostTestTabComponent