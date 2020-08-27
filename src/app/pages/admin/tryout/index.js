import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Col, Row } from "react-bootstrap"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MaterialTable, BootstrapModalHelper } from "../../../shared/common/index"
import { getTryoutScheduleList, postTryoutScheduleCreate, getTryoutPacketList, patchTryoutScheduleEdit, deleteTryoutScheduleDelete } from "./tryout-services"
import { useHistory } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import { TryoutAddScheduleComponent, TryoutEditScheduleComponent } from "./component/index"

const AdminTryOut = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    const [startDate, setStartDate] = useState(
        new Date()
    );

    const _history = useHistory()

    const [propScheduleList, setScheduleList] = useState([])
    const [propTryoutPacket, setTryoutPacket] = useState([])
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
        getTryoutScheduleList().then(res => {
            setScheduleList(res.data.data)
        })
        getTryoutPacketList().then(res => {
            setTryoutPacket(res.data.data)
        })
    }, [])

    //define the columns
    const scheduleListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Kode Paket', value: 'code'},
        {title: 'Deskripsi', value: 'name'},
        {title: 'Paket Try Out Id', value: 'tryoutPacketId'}
    ]

    const handleScheduleListener = value => {
        setScheduleEntity(value)
    }

    const handleEditScheduleListener = value => {
        setScheduleEditEntity(value)
    }

    const handleEditModalListener = id => {
        setModalEditShow(true)
        setEditEntityId(id)
    }

    const handleSubmitListener = action => {
        if(action === 'create')
            postTryoutScheduleCreate(propScheduleEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Jadwal berhasil ditambahkan'
                }
                setSuccessAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!'
                }
                setSuccessAlert(_alert)
            })
        if(action === 'edit')
        patchTryoutScheduleEdit(propScheduleEditEntity, propEditEntityId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Jadwal berhasil diubah'
            }
            setSuccessEditAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!'
                }
                setSuccessEditAlert(_alert)
            })
        if(action === 'delete')
        deleteTryoutScheduleDelete(propDeleteEntityId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Jadwal berhasil dihapus'
            }
            setSuccessDeleteAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!'
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
                            <Label>Tanggal</Label>
                            <br />
                            <DatePicker
                                className="form-control"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </Group>
                    </Col>
                    <Col md="6">
                        <Group>
                            <Label>Nama</Label>
                            <Control type="text" placeholder="Filter berdasarkan Nama" />
                        </Group>
                    </Col>
                </Row>
                <Button onClick={() => setModalShow(true)} style={{float:'right', margin: '18px'}} variant="success">Tambah Jadwal</Button>
                <MaterialTable 
                    handleEditAction={id => _history.push(`/admin/tryout/schedule-detail?schedule=${id}`)}
                    handleDeleteAction={id => { setDeleteEntityId(id); setDeleteAlert(true) }}
                    columns={scheduleListColumns} datasets={propScheduleList} 
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
            <TryoutAddScheduleComponent propTryoutPacket={propTryoutPacket} delegateScheduleEvent={ev => handleScheduleListener(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Jadwal"
            size="lg"
            propsAction={propModalEditShow}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
            delegateHideEvent={() => setModalEditShow(false)}>
            <TryoutEditScheduleComponent currentContextId={propEditEntityId} propTryoutPacket={propTryoutPacket} delegateScheduleEvent={ev => handleEditScheduleListener(ev)} />
        </BootstrapModalHelper>
        <SweetAlert {...propSuccessAlert} onConfirm={() => {setSuccessAlert({...propSuccessAlert, show: false}); setModalShow(false)}} onCancel={() => setSuccessAlert({...propSuccessAlert, show: false})}>
            {propSuccessAlert !== undefined ? 'Jadwal Tryout berhasil ditambahkan' : 'Terjadi kesalahan saat menambahkan jadwal'}
        </SweetAlert>
        <SweetAlert {...propSuccessEditAlert} onConfirm={() => {setSuccessEditAlert({...propSuccessEditAlert, show: false}); setModalEditShow(false)}} onCancel={() => setSuccessEditAlert({...propSuccessEditAlert, show: false})}>
            {propSuccessEditAlert !== undefined ? 'Jadwal Tryout berhasil diubah' : 'Terjadi kesalahan saat mengubah jadwal'}
        </SweetAlert>
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Jadwal" showCancel={true} showConfirm={true} onConfirm={() => handleSubmitListener('delete')} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus jadwal ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false}); setDeleteAlert(false)}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
            {propSuccessDeleteAlert !== undefined ? 'Jadwal Tryout berhasil dihapus' : 'Terjadi kesalahan saat menghapus jadwal'}
        </SweetAlert>
    </Container>)
}

export default AdminTryOut