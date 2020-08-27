import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"
import * as services from "../master-services"
import SweetAlert from "react-bootstrap-sweetalert"
import { CourseAddComponent, CourseEditComponent } from "../component/index";

const MasterCourse = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    const [propCourseList, setCourseList] = useState([])
    const [propCourse, setCourse] = useState([])
    const [propSuccessAlert, setSuccessAlert] = useState({show: false, title: ''})
    const [propModalShow, setModalShow] = useState(false)
    const [propModalEditShow, setModalEditShow] = useState(false)
    const [propCourseEntity, setCourseEntity] = useState({})
    const [propCourseEditEntity, setCourseEditEntity] = useState({})
    const [propEditEntityId, setEditEntityId] = useState(undefined)
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})
    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)

    const populateMajorList = async () => {
        services.getMajorList().then(res => {
            setCourseList(res.data.data)
        })
    }

    useEffect(() => {
        populateMajorList()
    },[])

    //define the columns
    const majorListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Kode', value: 'code'},
        {title: 'Deskripsi', value: 'name'}
    ]

    const handleMajorListener = value => {
        setCourseEntity(value)
    }

    const handleEditMajorListener = value => {
        setCourseEditEntity(value)
    }

    const handleEditModalListener = id => {
        setModalEditShow(true)
        setEditEntityId(id)
    }

    const handleSubmitListener = action => {
        if(action === 'create')
            services.postMajor(propCourseEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Paket Tryout {propCourseEntity['code']} berhasil ditambahkan</span>
                }
                setSuccessAlert(_alert)
                populateMajorList()
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambahkan {propCourseEntity['code']}</span>
                }
                setSuccessAlert(_alert)
            })
        if(action === 'edit')
            services.patchMajor(propCourseEditEntity, propEditEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian!',
                    children: <span>Course {propCourseEntity['code']} berhasil diubah</span>
                }
                setSuccessEditAlert(_alert)
                populateMajorList()
                }, err => {
                    const _alert = {
                        error: true,
                        show: true,
                        title: 'Terjadi kesalahan!',
                        children: <span>Terjadi kesalahan saat mengubah {propCourseEntity['code']}</span>
                    }
                    setSuccessEditAlert(_alert)
                })
        if(action === 'delete')
            services.deleteMajor(propDeleteEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Course {propDeleteEntityId} berhasil dihapus</span>
                }
                setSuccessDeleteAlert(_alert)
                populateMajorList()
                }, err => {
                    const _alert = {
                        error: true,
                        show: true,
                        title: 'Terjadi kesalahan!',
                        children: <span>Terjadi kesalahan saat menghapus {propDeleteEntityId}</span>
                    }
                    setSuccessDeleteAlert(_alert)
                })
    }

    return(<Container>
        <Card>
            <Header>
                <Title>Daftar Course</Title>
            </Header>
            <Body>
                <Form>
                    <Group as={Row}>
                        <Col md="6">
                            <Label>Nama</Label>
                            <Control type="text" placeholder="Filter berdasarkan Nama" />
                        </Col>
                    </Group>
                </Form>
                <Button onClick={() => setModalShow(true)} style={{float:'right', margin: '18px'}} variant="success">Tambah Course</Button>
                <MaterialTable 
                    handleEditAction={id => handleEditModalListener(id)}
                    handleDeleteAction={id => { console.info(id); setDeleteEntityId(id); setDeleteAlert(true) }}
                    columns={majorListColumns} datasets={propCourseList} 
                    actions={['edit','delete']}
                    withReturnId={true}
                 />
            </Body>
        </Card>
        <BootstrapModalHelper 
            title="Tambah Course"
            size="lg"
            propsAction={propModalShow}
            delegateSubmitEvent={() => handleSubmitListener('create')}
            delegateHideEvent={() => setModalShow(false)}>
                <CourseAddComponent delegateCourseEvent={ev => handleMajorListener(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Course"
            size="lg"
            propsAction={propModalEditShow}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
            delegateHideEvent={() => setModalEditShow(false)}>
                <CourseEditComponent currentContextId={propEditEntityId} delegateCourseEvent={ev => handleEditMajorListener(ev)} />
        </BootstrapModalHelper>
        <SweetAlert {...propSuccessAlert} onConfirm={() => {setSuccessAlert({...propSuccessAlert, show: false}); setModalShow(false)}} onCancel={() => setSuccessAlert({...propSuccessAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propSuccessEditAlert} onConfirm={() => {setSuccessEditAlert({...propSuccessEditAlert, show: false}); setModalEditShow(false)}} onCancel={() => setSuccessEditAlert({...propSuccessEditAlert, show: false})}>
        </SweetAlert>
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Course" showCancel={true} showConfirm={true} onConfirm={() => { handleSubmitListener('delete'); setDeleteAlert(false)}} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus Course ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false}); setDeleteAlert(false)}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
        </SweetAlert>
    </Container>)
}

export default MasterCourse