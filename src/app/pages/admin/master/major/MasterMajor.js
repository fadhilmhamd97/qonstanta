import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"
import * as services from "../master-services"
import SweetAlert from "react-bootstrap-sweetalert"
import { MajorAddComponent, MajorEditComponent } from "../component/index";

const MasterMajor = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    const [propMajorList, setMajorList] = useState([])
    const [propMajor, setMajor] = useState([])
    const [propSuccessAlert, setSuccessAlert] = useState({show: false, title: ''})
    const [propModalShow, setModalShow] = useState(false)
    const [propModalEditShow, setModalEditShow] = useState(false)
    const [propMajorEntity, setMajorEntity] = useState({})
    const [propMajorEditEntity, setMajorEditEntity] = useState({})
    const [propEditEntityId, setEditEntityId] = useState(undefined)
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})
    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)

    const populateMajorList = async () => {
        services.getMajorList().then(res => {
            setMajorList(res.data.data)
        })
    }

    useEffect(() => {
        populateMajorList()
    },[])

    //define the columns
    const majorListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Kode', value: 'code'},
        {title: 'Deskripsi', value: 'name'},
        {title: 'Status', value: 'isActive'}
    ]

    const handleMajorListener = value => {
        setMajorEntity(value)
    }

    const handleEditMajorListener = value => {
        setMajorEditEntity(value)
    }

    const handleEditModalListener = id => {
        setModalEditShow(true)
        setEditEntityId(id)
    }

    const handleSubmitListener = action => {
        if(action === 'create')
            services.postMajor(propMajorEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Jurusan {propMajorEntity['code']} berhasil ditambahkan</span>
                }
                setSuccessAlert(_alert)
                populateMajorList()
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambahkan {propMajorEntity['code']}</span>
                }
                setSuccessAlert(_alert)
            })
        if(action === 'edit')
            services.patchMajor(propMajorEditEntity, propEditEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian!',
                    children: <span>Jurusan {propMajorEntity['code']} berhasil diubah</span>
                }
                setSuccessEditAlert(_alert)
                populateMajorList()
                }, err => {
                    const _alert = {
                        error: true,
                        show: true,
                        title: 'Terjadi kesalahan!',
                        children: <span>Terjadi kesalahan saat mengubah {propMajorEntity['code']}</span>
                    }
                    setSuccessEditAlert(_alert)
                })
        if(action === 'delete')
            services.deleteMajor(propDeleteEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Jurusan {propDeleteEntityId} berhasil dihapus</span>
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
                <Title>Daftar Jurusan</Title>
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
                <Button onClick={() => setModalShow(true)} style={{float:'right', margin: '18px'}} variant="success">Tambah Jurusan</Button>
                <MaterialTable 
                    handleEditAction={id => handleEditModalListener(id)}
                    handleDeleteAction={id => { console.info(id); setDeleteEntityId(id); setDeleteAlert(true) }}
                    columns={majorListColumns} datasets={propMajorList} 
                    actions={['edit','delete']}
                    withReturnId={true}
                 />
            </Body>
        </Card>
        <BootstrapModalHelper 
            title="Tambah Jurusan"
            size="lg"
            propsAction={propModalShow}
            delegateSubmitEvent={() => handleSubmitListener('create')}
            delegateHideEvent={() => setModalShow(false)}>
                <MajorAddComponent delegateMajorEvent={ev => handleMajorListener(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Jurusan"
            size="lg"
            propsAction={propModalEditShow}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
            delegateHideEvent={() => setModalEditShow(false)}>
                <MajorEditComponent currentContextId={propEditEntityId} propMajor={propMajor} delegateMajorEvent={ev => handleEditMajorListener(ev)} />
        </BootstrapModalHelper>
        <SweetAlert {...propSuccessAlert} onConfirm={() => {setSuccessAlert({...propSuccessAlert, show: false}); setModalShow(false)}} onCancel={() => setSuccessAlert({...propSuccessAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propSuccessEditAlert} onConfirm={() => {setSuccessEditAlert({...propSuccessEditAlert, show: false}); setModalEditShow(false)}} onCancel={() => setSuccessEditAlert({...propSuccessEditAlert, show: false})}>
        </SweetAlert>
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Jurusan" showCancel={true} showConfirm={true} onConfirm={() => { handleSubmitListener('delete'); setDeleteAlert(false)}} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus Jurusan ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false}); setDeleteAlert(false)}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
        </SweetAlert>
    </Container>)
}

export default MasterMajor