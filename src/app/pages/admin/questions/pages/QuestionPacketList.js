import React,{ useState, useEffect } from "react"
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap"
import { MaterialTable, BootstrapModalHelper, TreeFolderContent } from "../../../../shared/common/index"
import { QuestionPacketAddModalComponent, QuestionPacketEditModalComponent } from "../component/index"
import { TreeMapperService } from "../../../../shared/helper/index"
import { TreeItemControlsSharedComponent, AddTreeModalSharedComponent, EditTreeModalSharedComponent } from "../../shared/index"
import { getQuestionPacketList, getQuestionTypeList,getQuestionPacketById, postQuestionPacket, deleteQuestionPacket, patchQuestionPacket } from "../question-service"
import { getHierarchyTree, deleteHierarchyTree, patchHierarchyTree, postHierarchyTree } from "../../shared/common-services"
import SweetAlert from "react-bootstrap-sweetalert"
import { useHistory } from "react-router-dom"

const QuestionPacketList = ({props}) => {

    const {Control, Label, Group} = Form
    const {Title, Body, Header} = Card

    /* TODO: MOVE THESE TO STORE */
    /* PROPS: Navigation dialog, Hierarcy Scope */

    const [propNavigationTreeControls, setNavigationTreeControls] = useState([])
    const [propAddTreeModal, setAddTreeModal] = useState(false)
    const [propEditTreeModal, setEditTreeModal] = useState(false)
    const [propTreeCurrentContext, setTreeCurrentContext] = useState(null)
    const [propTreeDeleteAlert, setTreeDeleteAlert] = useState(false)
    const [propTreeAddSuccessAlert, setTreeAddSuccessAlert] = useState({show: false, title: ''})
    const [propTreeEditSuccessAlert, setTreeEditSuccessAlert] = useState({show: false, title: ''})
    const [propTreeDeleteSuccessAlert, setTreeDeleteSuccessAlert] = useState({show: false, title: ''})
    const [propTreeAddEntity, setTreeAddEntity] = useState({})
    const [propTreeEditEntity, setTreeEditEntity] = useState({})
    /* END PROPS */

    const [propQuestionPacketList, setQuestionPacketList] = useState([])
    const [propQuestionPacketType, setQuestionPacketType] = useState([])
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

    useEffect(() => {
        populatePacketType()
        populateTreeItemControls()
    }, [])

    useEffect(() => {
        populatePacketList(propTreeCurrentContext)
    },[propTreeCurrentContext])

    //define the columns
    const tryoutPacketListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Kode', value: 'code'},
        {title: 'Nama', value: 'name'},
        {title: 'Jumlah Soal', value: 'questionTotal'},
        {title: 'Durasi', value: 'duration'},
        {title: 'Tipe Soal', value: 'questionPacketTypeId'}
    ]

    const history = useHistory()

    const populatePacketList = async (id = null) => {
        getQuestionPacketList().then(res => {
            if(id !== null){
                const {data} = res.data
                const _filtered = data.filter(v => {
                    return v['hierarchyType'] === id
                })
                setQuestionPacketList(_filtered)
            }
            else
            {
                setQuestionPacketList(res.data.data)
            }
        })
    }

    const changeToContext = cb => {
        //1 As Root
        setTreeCurrentContext(cb)
    }

    const populatePacketType = async () => {
        getQuestionTypeList().then(res => {
            setQuestionPacketType(res.data.data)
        })
    }

    const populateTreeItemControls = async () => {
        getHierarchyTree().then(res => {
            const { data } = res.data
            let customTreeContext = []

            data.map((v, i) => {
                const {id, parentId, name, root, hierarchyType } = v
                customTreeContext.push({id, parentId, description: name, root, hierarchyType, icon: 'default'})
            })

            setNavigationTreeControls(TreeMapperService.EntityDissolver(customTreeContext))
        })
    }

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
            postQuestionPacket(propPacketEntity).then(res => {
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
            patchQuestionPacket(propPacketEditEntity, propEditEntityId).then(res => {
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
            deleteQuestionPacket(propDeleteEntityId).then(res => {
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

    const handleSubmitTreeListener = action => {
        if(action === 'create')
            postHierarchyTree(propTreeAddEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Tree Item {propPacketEntity['name']} berhasil ditambahkan</span>
                }
                setTreeAddSuccessAlert(_alert)
                populateTreeItemControls()
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambahkan {propPacketEntity['name']}</span>
                }
                setTreeAddSuccessAlert(_alert)
            })
        if(action === 'edit')
            patchHierarchyTree(propTreeEditEntity, propTreeCurrentContext['id']).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Tree Item {propPacketEntity['name']} berhasil diubah</span>
                }
                setTreeEditSuccessAlert(_alert)
                populateTreeItemControls()
                }, err => {
                    const _alert = {
                        error: true,
                        show: true,
                        title: 'Terjadi kesalahan!',
                        children: <span>Terjadi kesalahan saat mengubah {propPacketEntity['name']}</span>
                    }
                    setTreeEditSuccessAlert(_alert)
                })
        if(action === 'delete')
            deleteHierarchyTree(propTreeCurrentContext['id']).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Tree Item {propDeleteEntityId} berhasil dihapus</span>
                }
                setTreeDeleteSuccessAlert(_alert)
                populateTreeItemControls()
                }, err => {
                    const _alert = {
                        error: true,
                        show: true,
                        title: 'Terjadi kesalahan!',
                        children: <span>Terjadi kesalahan saat menghapus {propDeleteEntityId}</span>
                    }
                    setTreeDeleteSuccessAlert(_alert)
                })
    }

    return(<Container>
        <Card>
            <Header>
                <Title>Paket Soal</Title>
            </Header>
            <Body>
                <Row>
                    <Col md="3" style={{overflow: 'auto'}}>
                        {/* CONTROLS: Set EventArgs and Listener to suspend the long syntax style */}
                        <h5>Controls</h5>
                        <hr />
                        <TreeItemControlsSharedComponent
                            delegateAddEvent={() => setAddTreeModal(true)} 
                            delegateEditEvent={() => setEditTreeModal(true)}
                            delegateDeleteEvent={() => setTreeDeleteAlert(true)}
                        />
                        <hr />
                        <div style={{minHeight: '390px'}}>
                            <TreeFolderContent propsNode={propNavigationTreeControls} onChoose={changeToContext} />
                        </div>
                    </Col>
                    <Col md="9">
                        <Row>
                            <Col md="6">
                                <h3>Daftar Paket Soal</h3>
                            </Col>
                            <Col md="6">
                                <Button onClick={() => setModalShow(true)} style={{float:'right'}} variant="success">Tambah Paket Tryout</Button>
                            </Col>
                        </Row>
                        <MaterialTable 
                            handleEditAction={id => history.push(`/admin/module-questions/question-packet/edit?id=${id}`)}
                            handleDeleteAction={id => { setDeleteEntityId(id); setDeleteAlert(true) }}
                            columns={tryoutPacketListColumns} datasets={propQuestionPacketList} 
                            actions={['edit','delete']}
                            withReturnId={true}
                        />
                    </Col>
                </Row>
            </Body>
        </Card>
        <BootstrapModalHelper 
            title="Tambah Paket Soal"
            size="lg"
            propsAction={propModalShow}
            delegateSubmitEvent={() => handleSubmitListener('create')}
            delegateHideEvent={() => setModalShow(false)}>
                <QuestionPacketAddModalComponent propCurrentTreeContext={propTreeCurrentContext} propQuestionPacketType={propQuestionPacketType} delegateQuestionPacketEvent={ev => handlePacketListener(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper 
            title="Edit Paket Soal"
            size="lg"
            propsAction={propModalEditShow}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
            delegateHideEvent={() => setModalEditShow(false)}>
                <QuestionPacketEditModalComponent propCurrentId={propEditEntityId} propCurrentTreeContext={propTreeCurrentContext} delegateQuestionPacketEvent={ev => handleEditPacketListener(ev)} />
        </BootstrapModalHelper>
        
        {/* ADD Tree MODAL */}
        <BootstrapModalHelper delegateSubmitEvent={() => handleSubmitTreeListener('create')} title="Tambah Folder Video" propsAction={propAddTreeModal} delegateHideEvent={() => setAddTreeModal(false)}>
            <AddTreeModalSharedComponent propsParent={propTreeCurrentContext} delegateTreeEvent={ev => setTreeAddEntity(ev)} />
        </BootstrapModalHelper>
        <BootstrapModalHelper delegateSubmitEvent={() => handleSubmitTreeListener('edit')} title="Edit Folder Video" propsAction={propEditTreeModal} delegateHideEvent={() => setEditTreeModal(false)}>
            <EditTreeModalSharedComponent delegateTreeEvent={ev => setTreeEditEntity(ev)} propsParent={propTreeCurrentContext} />
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

        <SweetAlert {...propTreeAddSuccessAlert} onConfirm={() => {setTreeAddSuccessAlert({...propTreeAddSuccessAlert, show: false}); setAddTreeModal(false)}} onCancel={() => setTreeAddSuccessAlert({...propTreeAddSuccessAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propTreeEditSuccessAlert} onConfirm={() => {setTreeEditSuccessAlert({...propTreeAddSuccessAlert, show: false}); setEditTreeModal(false)}} onCancel={() => setTreeEditSuccessAlert({...propTreeEditSuccessAlert, show: false})}>
        </SweetAlert>
        <SweetAlert danger={true} show={propTreeDeleteAlert} title="Hapus Paket" showCancel={true} showConfirm={true} onConfirm={() => { handleSubmitTreeListener('delete'); setTreeDeleteAlert(false)}} onCancel={() => setTreeDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus Tree Item ?
        </SweetAlert>
        <SweetAlert {...propTreeDeleteSuccessAlert} onConfirm={() => {setTreeDeleteSuccessAlert({...propTreeDeleteSuccessAlert, show: false}); setTreeDeleteAlert(false)}} onCancel={() => setTreeDeleteSuccessAlert({...propTreeDeleteSuccessAlert, show: false})}>
        </SweetAlert>
    </Container>)
}

export default QuestionPacketList