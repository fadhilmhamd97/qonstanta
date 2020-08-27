import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Col, Row } from "react-bootstrap"
import "react-datepicker/dist/react-datepicker.css"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"
import * as services from "../question-service"
import SweetAlert from "react-bootstrap-sweetalert"
import { QuestionPacketTypeAddModalComponent, QuestionPacketTypeEditModalComponent } from "../component/index";

const QuestionPacketList = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    const [propQuestionPacketTypeList, setQuestionPacketTypeList] = useState([])
    const [propSuccessAlert, setSuccessAlert] = useState({show: false, title: ''})
    const [propModalShow, setModalShow] = useState(false)
    const [propModalEditShow, setModalEditShow] = useState(false)
    const [propScheduleEntity, setScheduleEntity] = useState({})
    const [propScheduleEditEntity, setScheduleEditEntity] = useState({})
    const [propEditEntityId, setEditEntityId] = useState(undefined)
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})
    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)


    useEffect(() => {
        services.getQuestionTypeList().then(res => {
            setQuestionPacketTypeList(res.data.data)
        })
    }, [])

    //define the columns
    const questionPacketTypeListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Kode', value: 'code'},
        {title: 'Deskripsi', value: 'name'}
    ]

    const handleQuestionPacketListener = value => {
        setScheduleEntity(value)
    }

    const handleEditQuestionPacketListener = value => {
        setScheduleEditEntity(value)
    }

    const handleEditModalListener = id => {
        setModalEditShow(true)
        setEditEntityId(id)
    }

    const handleSubmitListener = action => {
        if(action === 'create')
            services.postQuestionType(propScheduleEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Paket Soal {propScheduleEntity['code']} berhasil ditambahkan</span>
                }
                setSuccessAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambah {propScheduleEntity['code']}</span>
                }
                setSuccessAlert(_alert)
            })
        if(action === 'edit')
        services.patchQuestionType(propScheduleEditEntity, propEditEntityId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Perhatian',
                children: <span>Paket Soal {propScheduleEntity['code']} berhasil diubah</span>
            }
            setSuccessEditAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambah {propScheduleEntity['code']}</span>
                }
                setSuccessEditAlert(_alert)
            })
        if(action === 'delete')
        services.deleteQuestionType(propDeleteEntityId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Perhatian',
                children: <span>Paket Soal {propScheduleEntity['code']} berhasil dihapus</span>
            }
            setSuccessDeleteAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menghapus {propScheduleEntity['code']}</span>
                }
                setSuccessDeleteAlert(_alert)
            })
    }

    return(<Container>
        <Card>
            <Header>
                <Title>Jadwal Tryout</Title>
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
                <Button onClick={() => setModalShow(true)} style={{float:'right', margin: '18px'}} variant="success">Tambah Jadwal</Button>
                <MaterialTable 
                    handleEditAction={id => handleEditModalListener(id)}
                    handleDeleteAction={id => { console.info(id); setDeleteEntityId(id); setDeleteAlert(true) }}
                    columns={questionPacketTypeListColumns} datasets={propQuestionPacketTypeList} 
                    actions={['edit','delete']}
                    withReturnId={true}
                 />
            </Form>
            </Body>
        </Card>
        <BootstrapModalHelper 
            title="Tambah Jadwal"
            size="lg"
            propsAction={propModalShow}
            delegateSubmitEvent={() => handleSubmitListener('create')}
            delegateHideEvent={() => setModalShow(false)}>
            <QuestionPacketTypeAddModalComponent delegateScheduleEvent={ev => handleQuestionPacketListener(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Jadwal"
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
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Jadwal" showCancel={true} showConfirm={true} onConfirm={() => handleSubmitListener('delete')} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus Paket Soal ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false}); setDeleteAlert(false)}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
        </SweetAlert>
    </Container>)
}

export default QuestionPacketList