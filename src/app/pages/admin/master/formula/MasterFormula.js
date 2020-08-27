import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"
import * as services from "../master-services"
import SweetAlert from "react-bootstrap-sweetalert"
import { FormulaAddComponent, FormulaEditComponent } from "../component/index";

const MasterFormula = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    const [propFormulaList, setFormulaList] = useState([])
    const [propFormula, setFormula] = useState([])
    const [propSuccessAlert, setSuccessAlert] = useState({show: false, title: ''})
    const [propModalShow, setModalShow] = useState(false)
    const [propModalEditShow, setModalEditShow] = useState(false)
    const [propFormulaEntity, setFormulaEntity] = useState({})
    const [propFormulaEditEntity, setFormulaEditEntity] = useState({})
    const [propEditEntityId, setEditEntityId] = useState(undefined)
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})
    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)

    const populateFormulaList = async () => {
        services.getFormulaList().then(res => {
            setFormulaList(res.data.data)
        })
    }

    useEffect(() => {
        populateFormulaList()
    },[])

    //define the columns
    const formulaListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Kode', value: 'code'},
        {title: 'Deskripsi', value: 'name'},
        {title: 'Nilai Benar', value: 'correctPoint'},
        {title: 'Nilai Salah', value: 'wrongPoint'}
    ]

    const handleFormulaListener = value => {
        setFormulaEntity(value)
    }

    const handleEditFormulaListener = value => {
        setFormulaEditEntity(value)
    }

    const handleEditModalListener = id => {
        setModalEditShow(true)
        setEditEntityId(id)
    }

    const handleSubmitListener = action => {
        if(action === 'create')
            services.postFormula(propFormulaEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Formula {propFormulaEntity['code']} berhasil ditambahkan</span>
                }
                setSuccessAlert(_alert)
                populateFormulaList()
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambahkan {propFormulaEntity['code']}</span>
                }
                setSuccessAlert(_alert)
            })
        if(action === 'edit')
            services.patchFormula(propFormulaEditEntity, propEditEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian!',
                    children: <span>Formula {propFormulaEntity['code']} berhasil diubah</span>
                }
                setSuccessEditAlert(_alert)
                populateFormulaList()
                }, err => {
                    const _alert = {
                        error: true,
                        show: true,
                        title: 'Terjadi kesalahan!',
                        children: <span>Terjadi kesalahan saat mengubah {propFormulaEntity['code']}</span>
                    }
                    setSuccessEditAlert(_alert)
                })
        if(action === 'delete')
            services.deleteFormula(propDeleteEntityId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Formula {propDeleteEntityId} berhasil dihapus</span>
                }
                setSuccessDeleteAlert(_alert)
                populateFormulaList()
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
                <Title>Daftar Formula</Title>
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
                <Button onClick={() => setModalShow(true)} style={{float:'right', margin: '18px'}} variant="success">Tambah Formula</Button>
                <MaterialTable 
                    handleEditAction={id => handleEditModalListener(id)}
                    handleDeleteAction={id => { console.info(id); setDeleteEntityId(id); setDeleteAlert(true) }}
                    columns={formulaListColumns} datasets={propFormulaList} 
                    actions={['edit','delete']}
                    withReturnId={true}
                 />
            </Body>
        </Card>
        <BootstrapModalHelper 
            title="Tambah Formula"
            size="lg"
            propsAction={propModalShow}
            delegateSubmitEvent={() => handleSubmitListener('create')}
            delegateHideEvent={() => setModalShow(false)}>
                <FormulaAddComponent delegateFormulaEvent={ev => handleFormulaListener(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Formula"
            size="lg"
            propsAction={propModalEditShow}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
            delegateHideEvent={() => setModalEditShow(false)}>
                <FormulaEditComponent currentContextId={propEditEntityId} delegateFormulaEvent={ev => handleEditFormulaListener(ev)} />
        </BootstrapModalHelper>
        <SweetAlert {...propSuccessAlert} onConfirm={() => {setSuccessAlert({...propSuccessAlert, show: false}); setModalShow(false)}} onCancel={() => setSuccessAlert({...propSuccessAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propSuccessEditAlert} onConfirm={() => {setSuccessEditAlert({...propSuccessEditAlert, show: false}); setModalEditShow(false)}} onCancel={() => setSuccessEditAlert({...propSuccessEditAlert, show: false})}>
        </SweetAlert>
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Formula" showCancel={true} showConfirm={true} onConfirm={() => { handleSubmitListener('delete'); setDeleteAlert(false)}} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus Formula ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false}); setDeleteAlert(false)}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
        </SweetAlert>
    </Container>)
}

export default MasterFormula