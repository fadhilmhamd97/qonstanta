import React,{ useState } from "react"
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"
import { questionModuleColumns, questionModuleDatasets } from "../_data"
import { QuestionContextScopeComponent, CreateQuestionModalComponent } from "../component/index";

const CreateQuestions = ({props}) => {
    const {Body, Title, Header} = Card
    const {Control, Label, Group} = Form

    const [propQuestionModal, setQuestionModal] = useState(false)
    const [propQuestionContextModal, setQuestionContextModal] = useState(false)

    return(<Container>
        <Card>
            <Header>
                <Title>Tambah Module Pertanyaan</Title>
            </Header>
            <Body>
                <Form>
                    <Container>
                    <Group as={Row}>
                        <Label md="4" column>Deskripsi</Label>
                        <Col md="8">
                            <Control type="text" placeholder="Nama" />
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label md="4" column>Jurusan</Label>
                        <Col md="8">
                            <Control as="select">
                                <option>IPA</option>
                                <option>IPS</option>
                            </Control>
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label md="4" column>Kelas</Label>
                        <Col md="8">
                            <Control as="select">
                                <option>X</option>
                                <option>XI</option>
                                <option>XII</option>
                            </Control>
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label md="4" column>Mata Pelajaran</Label>
                        <Col md="8">
                            <Control as="select">
                                <option>Biologi</option>
                                <option>Fisika</option>
                                <option>Kimia</option>
                            </Control>
                        </Col>
                    </Group>
                    </Container>
                </Form>
                <h4>Soal</h4>
                <hr />
                <Button onClick={() => setQuestionModal(true)} style={{float: 'right', margin: '18px'}} variant="success">Tambah Pertanyaan</Button>
                <MaterialTable
                    columns={questionModuleColumns}
                    datasets={questionModuleDatasets}
                    actions={['edit','delete']}
                />
            </Body>
        </Card>
        <BootstrapModalHelper
            size="lg"
            title="Tambah Pertanyaan"
            propsAction={propQuestionModal}
            delegateHideEvent={() => setQuestionModal(false)}
        >
            <CreateQuestionModalComponent delegateQuestionEvent={() => setQuestionContextModal(true)} delegateQuestionOption={() => setQuestionContextModal(true)} />
        </BootstrapModalHelper>

        <BootstrapModalHelper
            size="lg"
            title="Tambah Opsi Jawaban"
            propsAction={propQuestionContextModal}
            delegateHideEvent={() => setQuestionContextModal(false)}
        >
            <QuestionContextScopeComponent />
        </BootstrapModalHelper>

    </Container>)
}

export default CreateQuestions