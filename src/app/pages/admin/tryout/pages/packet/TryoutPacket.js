import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../../shared/common/index"
import { getTryoutPacketList, getTryoutPacketType, postTryoutPacketCreate, patchTryoutPacketEdit, deleteTryoutPacketDelete } from "../../tryout-services"
import SweetAlert from "react-bootstrap-sweetalert"
import { TryoutAddPacketComponent, TryoutEditPacketComponent } from "../../component/index";

const TryoutPacket = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    const [propTryoutPacketList, setTryoutPacketList] = useState([])
    const [propTryoutPacketType, setTryoutPacketType] = useState([])
    const [propSuccessAlert, setSuccessAlert] = useState({show: false, title: ''})
    const [propModalShow, setModalShow] = useState(false)
    const [propModalEditShow, setModalEditShow] = useState(false)
    const [propPacketEntity, setPacketEntity] = useState({})
    const [propPacketEditEntity, setPacketEditEntity] = useState({})
    const [propEditEntityId, setEditEntityId] = useState(undefined)
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})
    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)

    const populatePacketList = async () => {
        getTryoutPacketList().then(res => {
            setTryoutPacketList(res.data.data)
        })
    }


    useEffect(() => {
        populatePacketList()

        getTryoutPacketType().then(res => {
            setTryoutPacketType(res.data.data)
        })
    }, [])

    //define the columns
    const tryoutPacketListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Kode Paket', value: 'code'},
        {title: 'Deskripsi', value: 'name'},
        {title: 'Harga', value: 'price'},
        {title: 'Harga Member', value: 'priceMember'},
        {title: 'Tipe Paket Tryout Id', value: 'tryoutPacketTypeId'}
    ]

    const handlePacketListener = value => {
        setPacketEntity(value)
    }

    const handleEditPacketListener = value => {
        setPacketEditEntity(value)
    }

    const handleEditModalListener = id => {
        setModalEditShow(true)
        setEditEntityId(id)
    }

    const handleSubmitListener = action => {
        if(action === 'create')
            postTryoutPacketCreate(propPacketEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Paket Tryout {propPacketEntity['code']} berhasil ditambahkan</span>
                }
                setSuccessAlert(_alert)
                populatePacketList()
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambahkan {propPacketEntity['code']}</span>
                }
                setSuccessAlert(_alert)
            })
        if(action === 'edit')
            patchTryoutPacketEdit(propPacketEditEntity, propEditEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Paket Tryout berhasil diubah',
                    children: <span>Paket tryout {propPacketEntity['code']} berhasil diubah</span>
                }
                setSuccessEditAlert(_alert)
                populatePacketList()
                }, err => {
                    const _alert = {
                        error: true,
                        show: true,
                        title: 'Terjadi kesalahan!',
                        children: <span>Terjadi kesalahan saat mengubah {propPacketEntity['code']}</span>
                    }
                    setSuccessEditAlert(_alert)
                })
        if(action === 'delete')
            deleteTryoutPacketDelete(propDeleteEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Paket Tryout {propDeleteEntityId} berhasil dihapus</span>
                }
                setSuccessDeleteAlert(_alert)
                populatePacketList()
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
                <Title>Paket Tryout</Title>
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
                <Button onClick={() => setModalShow(true)} style={{float:'right', margin: '18px'}} variant="success">Tambah Paket Tryout</Button>
                <MaterialTable 
                    handleEditAction={id => handleEditModalListener(id)}
                    handleDeleteAction={id => { console.info(id); setDeleteEntityId(id); setDeleteAlert(true) }}
                    columns={tryoutPacketListColumns} datasets={propTryoutPacketList} 
                    actions={['edit','delete']}
                    withReturnId={true}
                 />
            </Body>
        </Card>
        <BootstrapModalHelper 
            title="Tambah Paket Tryout"
            size="lg"
            propsAction={propModalShow}
            delegateSubmitEvent={() => handleSubmitListener('create')}
            delegateHideEvent={() => setModalShow(false)}>
                <TryoutAddPacketComponent propTryoutPacketType={propTryoutPacketType} delegateScheduleEvent={ev => handlePacketListener(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Paket Tryout"
            size="lg"
            propsAction={propModalEditShow}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
            delegateHideEvent={() => setModalEditShow(false)}>
                <TryoutEditPacketComponent currentContextId={propEditEntityId} propTryoutPacketType={propTryoutPacketType} delegateScheduleEvent={ev => handleEditPacketListener(ev)} />
        </BootstrapModalHelper>
        <SweetAlert {...propSuccessAlert} onConfirm={() => {setSuccessAlert({...propSuccessAlert, show: false}); setModalShow(false)}} onCancel={() => setSuccessAlert({...propSuccessAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propSuccessEditAlert} onConfirm={() => {setSuccessEditAlert({...propSuccessEditAlert, show: false}); setModalEditShow(false)}} onCancel={() => setSuccessEditAlert({...propSuccessEditAlert, show: false})}>
        </SweetAlert>
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Paket" showCancel={true} showConfirm={true} onConfirm={() => { handleSubmitListener('delete'); setDeleteAlert(false)}} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus paket ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false}); setDeleteAlert(false)}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
        </SweetAlert>
    </Container>)
}

export default TryoutPacket