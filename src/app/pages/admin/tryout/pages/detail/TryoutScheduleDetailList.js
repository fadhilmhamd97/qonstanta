import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../../shared/common/index"
import { getScheduleDetailList, getTryoutPacketList, getQuestionPacketList, getTryoutScheduleById, postScheduleDetail, patchTryoutScheduleEdit, patchScheduleDetail, deleteScheduleDetail, getTryoutScheduleDetailList } from "../../tryout-services"
import SweetAlert from "react-bootstrap-sweetalert"
import { TryoutAddDetailScheduleComponent, TryoutEditDetailScheduleComponent } from "../../component/index"
import { useLocation } from "react-router-dom";

const TryoutPacket = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    const search = useLocation().search

    const currentScheduleContextId = new URLSearchParams(search).get('schedule')

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        questionPacketId: undefined
    })

    const [propTryoutDetailList, setTryoutDetailList] = useState([])
    const [propTryoutPacketList, setTryoutPacketList] = useState([])
    const [propTryoutDetail, setTryoutDetail] = useState([])
    const [propSuccessAlert, setSuccessAlert] = useState({show: false, title: ''})
    const [propModalShow, setModalShow] = useState(false)
    const [propModalEditShow, setModalEditShow] = useState(false)
    const [propScheduleDetailEntity, setScheduleEntity] = useState({})
    const [propDetailEditEntity, setScheduleEditEntity] = useState({})
    const [propEditEntityId, setEditEntityId] = useState(undefined)
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})
    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)

    const [propAddScheduleDetailEntity, setAddScheduleDetailEntity] = useState({})

    const [propSuccessEditScheduleAlert, setSuccessEditScheduleAlert] = useState({show: false, title: ''})

    const populateTryoutPacket = async () => {
        getTryoutPacketList().then(res => {
            const {data} = res.data
            setTryoutPacketList(data)
        })
    }

    const populateDetailList = async () => {
        getScheduleDetailList().then(res => {
            const {data} = res.data
            setTryoutDetailList(data)
        })
    }

    const populateDetailById = async id => {
        getTryoutScheduleById(id).then(res =>{
            const {data} = res.data
            setFormDetailData(data)
        })
    }

    useEffect(() => {
        populateDetailById(currentScheduleContextId)
        populateTryoutPacket()
        populateDetailList()
    }, [])

    //define the columns
    const tryoutScheduleListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Check In', value: 'datetimeCheckin'},
        {title: 'Mulai', value: 'datetimeStart'},
        {title: 'Selesai', value: 'datetimeEnd'},
        {title: 'Id Jadwal', value: 'tryoutScheduleId'},
        {title: 'Paket Soal Id', value: 'questionPacketId'}
    ]

    const handleScheduleListener = value => {
        setScheduleEntity(value)
    }

    const handleEditScheduleDetailListener = value => {
        setScheduleEditEntity(value)
    }

    const handleEditModalListener = id => {
        setModalEditShow(true)
        setEditEntityId(id)
    }

    const handleSubmitListener = action => {
        if(action === 'create')
            postScheduleDetail(propAddScheduleDetailEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Detail Jadwal {propAddScheduleDetailEntity['id']} berhasil ditambahkan</span>
                }
                populateDetailList()
                setSuccessEditScheduleAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambahkan {propAddScheduleDetailEntity['id']}</span>
                }
                setSuccessEditScheduleAlert(_alert)
            })
        if(action === 'edit')
            patchScheduleDetail(propDetailEditEntity, propEditEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Detail Jadwal berhasil diubah',
                    children: <span>Detail Jadwal {propScheduleDetailEntity['code']} berhasil diubah</span>
                }
                setSuccessEditAlert(_alert)
                populateDetailList()
                }, err => {
                    const _alert = {
                        error: true,
                        show: true,
                        title: 'Terjadi kesalahan!',
                        children: <span>Terjadi kesalahan saat mengubah {propScheduleDetailEntity['code']}</span>
                    }
                    setSuccessEditAlert(_alert)
                })
        if(action === 'delete')
            deleteScheduleDetail(propDeleteEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Detail Jadwal {propDeleteEntityId} berhasil dihapus</span>
                }
                setSuccessDeleteAlert(_alert)
                populateDetailList()
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

    const handleEditScheduleEvent = () => {
        patchTryoutScheduleEdit(propFormDetailData,currentScheduleContextId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Perhatian',
                children: <span>Jadwal Tryout {propDeleteEntityId} berhasil diubah</span>
            }
            setSuccessEditScheduleAlert(_alert)
        }, err => {
            const _alert = {
                error: true,
                show: true,
                title: 'Terjadi kesalahan!',
                children: <span>Terjadi kesalahan saat menghapus Jadwal {propDeleteEntityId}</span>
            }
            setSuccessEditScheduleAlert(_alert)
        })
    }

    return(<Container>
        <Card>
            <Header>
                <Title>Detail Tryout</Title>
            </Header>
            <Body>
                <Form>
                    <Group as={Row}>
                        <Label column md="6">Deskripsi</Label>
                        <Col md="6">
                            <Control value={propFormDetailData['name']} type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Deskripsi Jadwal" />
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label column md="6">Paket Soal</Label>
                        <Col md="6">
                            <Control as="select" defaultValue="0" onChange={ev => setFormDetailData({...propFormDetailData, tryoutPacketTypeId: parseInt(ev.currentTarget.value)})}>
                                <option value="0">-- Pilih Jenis Paket --</option>
                                {propTryoutPacketList.map((v, i) => {
                                    if(v['id'] === propFormDetailData['tryoutPacketId']) return(<option key={i} selected={true} value={v['id']}>{v['code']}</option>) 
                                    else return(<option key={i} value={v['id']}>{v['code']}</option>)
                                })}
                            </Control>
                        </Col>
                    </Group>
                    <Group style={{textAlign:'right', padding: '1em',marginTop: '1.2em'}}>
                        <Button variant="success" onClick={() => handleEditScheduleEvent()} style={{width: '30%'}}>Simpan Perubahan</Button>
                    </Group>
                </Form>
            </Body>
        </Card>
        <Card style={{marginTop: '2em'}}>
            <Header>
                <Title>Daftar Detail Jadwal</Title>
            </Header>
            <Body>
            <Button onClick={() => setModalShow(true)} style={{float:'right', margin: '18px'}} variant="success">Tambah Paket Tryout</Button>
                <MaterialTable 
                    handleEditAction={id => handleEditModalListener(id)}
                    handleDeleteAction={id => { console.info(id); setDeleteEntityId(id); setDeleteAlert(true) }}
                    columns={tryoutScheduleListColumns} datasets={propTryoutDetailList} 
                    actions={['edit','delete']}
                    withReturnId={true}
                 />
            </Body>
        </Card>
        <BootstrapModalHelper 
            title="Tambah Detail Tryout"
            size="lg"
            propsAction={propModalShow}
            delegateSubmitEvent={() => handleSubmitListener('create')}
            delegateHideEvent={() => setModalShow(false)}>
                <TryoutAddDetailScheduleComponent delegateDetailEvent={ev => setAddScheduleDetailEntity(ev)} contextScheduleId={currentScheduleContextId} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Detail Tryout"
            size="lg"
            propsAction={propModalEditShow}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
            delegateHideEvent={() => setModalEditShow(false)}>
                <TryoutEditDetailScheduleComponent contextScheduleId={propEditEntityId} delegateDetailEvent={ev => handleEditScheduleDetailListener(ev)} />
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


        <SweetAlert {...propSuccessEditScheduleAlert} onConfirm={() => {setSuccessEditScheduleAlert({...propSuccessEditScheduleAlert, show: false}); setModalShow(false)}} onCancel={() => setSuccessEditScheduleAlert({...propSuccessEditScheduleAlert, show: false})}>
        </SweetAlert>
    </Container>)
}

export default TryoutPacket