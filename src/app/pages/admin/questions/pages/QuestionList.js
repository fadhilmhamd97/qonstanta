import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Col, Row } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"
import * as services from "../question-service"
import SweetAlert from "react-bootstrap-sweetalert"
import { useHistory } from "react-router-dom"
import { QuestionPacketTypeAddModalComponent, QuestionPacketTypeEditModalComponent } from "../component/index";

const QuestionList = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    const [propQuestionList, setQuestionList] = useState([])
    const [propSuccessAlert, setSuccessAlert] = useState({show: false, title: ''})
    const [propModalShow, setModalShow] = useState(false)
    const [propModalEditShow, setModalEditShow] = useState(false)
    const [propQuestionEntity, setQuestionEntity] = useState({})
    const [propQuestionEditEntity, setQuestionEditEntity] = useState({})
    const [propEditEntityId, setEditEntityId] = useState(undefined)
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})
    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)

    const history = useHistory()


    useEffect(() => {
        services.getQuestionList().then(res => {
            setQuestionList(res.data.data)
        })
    }, [])

    //define the columns
    const questionListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Soal', value: 'question'},
        {title: 'Tipe', value: 'questionType'},
        {title: 'Url Image', value: 'imageUrl'},
        {title: 'Url Video', value: 'videoUrl'},
        {title: 'Paket Soal Id', value: 'questionPacketId'},
        {title: 'Pembahasan Id', value: 'explanationId'}
    ]

    const handleQuestionPacketListener = value => {
        setQuestionEntity(value)
    }

    const handleEditQuestionPacketListener = value => {
        setQuestionEditEntity(value)
    }

    const handleEditModalListener = id => {
        setModalEditShow(true)
        setEditEntityId(id)
    }

    const handleSubmitListener = action => {
        if(action === 'create')
            services.postQuestionType(propQuestionEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Soal {propQuestionEntity['code']} berhasil ditambahkan</span>
                }
                setSuccessAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambah {propQuestionEntity['code']}</span>
                }
                setSuccessAlert(_alert)
            })
        if(action === 'edit')
        services.patchQuestionType(propQuestionEditEntity, propEditEntityId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Perhatian',
                children: <span>Soal {propQuestionEntity['code']} berhasil diubah</span>
            }
            setSuccessEditAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambah {propQuestionEntity['code']}</span>
                }
                setSuccessEditAlert(_alert)
            })
        if(action === 'delete')
        services.deleteQuestionType(propDeleteEntityId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Perhatian',
                children: <span>Soal {propQuestionEntity['code']} berhasil dihapus</span>
            }
            setSuccessDeleteAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menghapus {propQuestionEntity['code']}</span>
                }
                setSuccessDeleteAlert(_alert)
            })
    }

    return(<Container>
        <Card>
            <Header>
                <Title>Daftar Soal</Title>
            </Header>
            <Body>
                <Form>
                <Row>
                    <Col md="6">
                        <Group>
                            <Label>Nama</Label>
                            <Control type="text" placeholder="Filter berdasarkan Nama" />
                        </Group>
                    </Col>
                </Row>
                <Button onClick={() => setModalShow(true)} style={{float:'right', margin: '18px'}} variant="success">Tambah Soal</Button>
                <MaterialTable 
                    handleEditAction={id => history.push(`/admin/module-questions/question-packet/edit?${id}`)}
                    handleDeleteAction={id => { setDeleteEntityId(id); setDeleteAlert(true) }}
                    columns={questionListColumns} datasets={propQuestionList} 
                    actions={['edit','delete']}
                    withReturnId={true}
                 />
            </Form>
            </Body>
        </Card>
        <BootstrapModalHelper 
            title="Tambah Soal"
            size="lg"
            propsAction={propModalShow}
            delegateSubmitEvent={() => handleSubmitListener('create')}
            delegateHideEvent={() => setModalShow(false)}>
            <QuestionPacketTypeAddModalComponent delegateScheduleEvent={ev => handleQuestionPacketListener(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Soal"
            size="lg"
            propsAction={propModalEditShow}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
            delegateHideEvent={() => setModalEditShow(false)}>
            <QuestionPacketTypeEditModalComponent currentContextId={propEditEntityId} delegateScheduleEvent={ev => handleEditQuestionPacketListener(ev)} />
        </BootstrapModalHelper>
        <SweetAlert {...propSuccessAlert} onConfirm={() => {setSuccessAlert({...propSuccessAlert, show: false}); setModalShow(false)}} onCancel={() => setSuccessAlert({...propSuccessAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propSuccessEditAlert} onConfirm={() => {setSuccessEditAlert({...propSuccessEditAlert, show: false}); setModalEditShow(false)}} onCancel={() => setSuccessEditAlert({...propSuccessEditAlert, show: false})}>
        </SweetAlert>
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Soal" showCancel={true} showConfirm={true} onConfirm={() => handleSubmitListener('delete')} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus Soal ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false}); setDeleteAlert(false)}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
        </SweetAlert>
    </Container>)
}

export default QuestionList