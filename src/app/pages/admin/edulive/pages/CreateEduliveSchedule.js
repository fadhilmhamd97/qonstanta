import React,{useState} from "react"
import { Container, Button, Card } from "react-bootstrap"

import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index";
import { EduliveDetailFormComponent, EduliveStudentPickerComponent } from "../component/index";
import { moduleSelectData, studentColumnsData, studentTableData } from "../_data"

const CreateEduliveSchedule = ({props}) => {

    const {Body, Header, Title} = Card

    const [propCreateEduliveModal, setCreateEduliveModal] = useState(false)

    return(<Container>
        <Card>
            <Header>
                <Title>Create New Schedule</Title>
            </Header>
            <Body>
                <EduliveDetailFormComponent />
                <h3>Siswa</h3>
                <hr />
                <br />
                <Container>
                    <Button onClick={() => setCreateEduliveModal(true)} variant="success" style={{float: 'right'}}>Tambah Siswa</Button>
                    <MaterialTable actions={['delete']} columns={studentColumnsData} datasets={studentTableData} />
                </Container>
            </Body>
        </Card>
        <BootstrapModalHelper
            size="lg"
            title="Tambah siswa"
            propsAction={propCreateEduliveModal}
            delegateHideEvent={() => setCreateEduliveModal(false)}
        >
            <EduliveStudentPickerComponent  />
        </BootstrapModalHelper>
    </Container>)
}

export default CreateEduliveSchedule