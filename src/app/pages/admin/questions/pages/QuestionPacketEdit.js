import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap"
import * as services from "../question-service"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"
import SweetAlert from "react-bootstrap-sweetalert"
import { QuestionAddModalComponent } from "../component/"
import { useHistory } from "react-router-dom"

const QuestionPacketEditPage = ({props}) => {
    const {Group, Label, Control, Check} = Form
    const {Header, Body, Title} = Card

    //define the columns
    const questionListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Soal', value: 'question'},
        {title: 'Tipe', value: 'questionType'},
        {title: 'Image', value: 'imageName'},
        {title: 'Aktif', value: 'isActive'}
    ]

    const history = useHistory()

    const [propFormDetailData, setFormDetailData] = useState({
        name: '',
        questionTotal: undefined,
        duration: undefined,
        description: undefined,
        publish: false,
        isActive: false,
        questionPacketTypeId: undefined,
        formulaId: undefined,
        hierarchyId: undefined
    })

    const [propFormulaList, setFormulaList] = useState([])
    const [propPublishCondition, setPublishCondition] = useState(false)
    const [propActiveCondition, setActiveCondition] = useState(false)
    const [propQuestionPacketType, setQuestionPacketType] = useState([])
    const [propQuestionList, setQuestionList] = useState([])
    const [propQuestionAddModalAlert, setQuestionAddModalAlert] = useState(false)
    const [propQuestionEditModalAlert, setQuestionEditModalAlert] = useState(false)
    const [propSuccessCreateAlert, setSuccessCreateAlert] = useState({show: false, title: ''})
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})

    const [propQuestionAddEntity, setQuestionAddEntity] = useState({})

    const [propTypingContext, setTypingContext] = useState(undefined)

    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)
    const [propSuccessEditQuestionPacketAlert, setSuccessEditQuestionPacketAlert] = useState({show: false, title: ''})

    const contextQuestionPacketId = new URLSearchParams(window.location.search).get('id')

    useEffect(() => {
        populateDetailPacketType(contextQuestionPacketId)
        populateFormula()
        populatePacketType()
        populateQuestionByPacket(contextQuestionPacketId)
    },[])

    const populateFormula = async () => {
        services.getFormulaList().then(res => {
            const {data} = res.data
            setFormulaList(data)
        })
    }

    const populatePacketType = async () => {
        services.getQuestionPacketList().then(res => {
            const {data} = res.data
            setQuestionPacketType(data)
        })
    }

    const populateDetailPacketType = async id => {
        services.getQuestionPacketById(id).then(res => {
            const {data} = res.data
            const {name, questionTotal, duration, description, publish, isActive, questionPacketTypeId, formulaId, hierarchyId} = data
            setFormDetailData({name, questionTotal, duration, description, publish, isActive, questionPacketTypeId, formulaId, hierarchyId})
            setPublishCondition(publish)
            setActiveCondition(isActive)
        })
    }

    const populateQuestionByPacket = async id => {
        services.getQuestions().then(res => {
            const {data} = res.data
            const filtered = data.filter(v => {
                return v['questionPacketId'] == id
            })
            setQuestionList(filtered)
        })
    }

    const handleSubmitListener = action => {
        if(action === 'create'){
            const _ctx = propQuestionAddEntity['question'] !== '-- IMAGE TYPE --' ? propTypingContext : '-- IMAGE TYPE --'
            
            services.postQuestion({...propQuestionAddEntity, question: _ctx}).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Soal {propQuestionAddEntity['id']} berhasil ditambahkan</span>
                }
                setSuccessCreateAlert(_alert)
                populateQuestionByPacket(contextQuestionPacketId)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambah {propQuestionAddEntity['code']}</span>
                }
                setSuccessCreateAlert(_alert)
            })
        }
        if(action === 'delete')
        services.deleteQuestion(propDeleteEntityId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Perhatian',
                children: <span>Soal {propDeleteEntityId} berhasil dihapus</span>
            }
            setSuccessDeleteAlert(_alert)
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

    const handleEditQuestionPacket = (entityQuestion) => {
        services.patchQuestionPacket(entityQuestion, contextQuestionPacketId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Perhatian!',
                children: <span>Paket Soal {contextQuestionPacketId} berhasil diubah</span>
            }
            setSuccessEditQuestionPacketAlert(_alert)
        }, err => {
            const _alert = {
                error: true,
                show: true,
                title: 'Terjadi kesalahan!',
                children: <span>Terjadi kesalahan saat mengedit {contextQuestionPacketId}</span>
            }
            setSuccessEditQuestionPacketAlert(_alert)
        })
    }
    
    return(<>
        <Container>
            <Card>
                <Header>{`Edit Packet - ${propFormDetailData['questionPacketTypeId']}`}</Header>
                <Body>
                <Form>
                    <Group as={Row}>
                        <Label column md="4">
                            Nama Paket
                        </Label>
                        <Col md="8">
                            <Control value={propFormDetailData['name']} type="text" onChange={ev => setFormDetailData({...propFormDetailData, name: ev.target.value})} placeholder="Nama" />
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label column md="4">
                            Deskripsi
                        </Label>
                        <Col md="8">
                            <Control value={propFormDetailData['description']} type="text" onChange={ev => setFormDetailData({...propFormDetailData, description: ev.target.value})} placeholder="Deskripsi" />
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label column md="4">
                            Tipe Paket Soal
                        </Label>
                        <Col md="8">
                            <Control as="select" defaultValue="0" onChange={ev => setFormDetailData({...propFormDetailData, questionPacketTypeId: parseInt(ev.currentTarget.value)})}>
                                <option value="0">-- Pilih Tipe Paket Soal --</option>
                                {propQuestionPacketType.map((v, i) => {
                                    if(v['id'] === propFormDetailData['questionPacketTypeId']) return(<option key={i} selected={true} value={v['id']}>{v['code']}</option>) 
                                    else return(<option key={i} value={v['id']}>{v['code']}</option>)
                                })}
                            </Control>
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label column md="4">
                            Formula
                        </Label>
                        <Col md="8">
                            <Control as="select" defaultValue="0" onChange={ev => setFormDetailData({...propFormDetailData, formulaId: parseInt(ev.currentTarget.value)})}>
                                <option value="0">-- Pilih Formula --</option>
                                {propFormulaList.map((v, i) => {
                                    if(v['id'] === propFormDetailData['formulaId']) return(<option key={i} selected={true} value={v['id']}>{v['code']}</option>) 
                                    else return(<option key={i} value={v['id']}>{v['code']}</option>)
                                })}
                            </Control>
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label column md="4">
                            Total Pertanyaan
                        </Label>
                        <Col md="8">
                            <Control value={propFormDetailData['questionTotal']} type="number" onChange={ev => setFormDetailData({...propFormDetailData, questionTotal: parseInt(ev.target.value)})} placeholder="Total" />
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Label column md="4">
                            Durasi
                        </Label>
                        <Col md="8">
                            <Control value={propFormDetailData['duration']} type="number" onChange={ev => setFormDetailData({...propFormDetailData, duration: parseInt(ev.target.value)})} placeholder="Durasi" />
                        </Col>
                    </Group>
                    <Group as={Row}>
                        <Col md="6">
                            <Check label="Publish" checked={propFormDetailData['publish'] ? true : false} onChange={() => {const data = !propPublishCondition; setPublishCondition(data); setFormDetailData({...propFormDetailData, publish: data}) }} />
                        </Col>
                        <Col md="6">
                            <Check label="Aktif" checked={propFormDetailData['isActive'] ? true : false} onChange={() => {const data = !propActiveCondition; setActiveCondition(data); setFormDetailData({...propFormDetailData, isActive: data}) }} />
                        </Col>
                    </Group>
                    <Group style={{textAlign:'right', padding: '1em',marginTop: '1.2em'}}>
                        <Button onClick={() => handleEditQuestionPacket(propFormDetailData)} variant="success" style={{width: '30%'}}>Simpan Perubahan</Button>
                    </Group>
                </Form>
                </Body>
            </Card>
            <Card style={{marginTop: '2em'}}>
                <Body>
                    <h4>Soal</h4>
                    <hr />
                    <Button onClick={() => setQuestionAddModalAlert(true)} style={{float: 'right', margin:'14px'}} variant="success">Tambah Soal</Button>
                    <MaterialTable
                        actions={['edit','delete']}
                        columns={questionListColumns}
                        datasets={propQuestionList}
                        handleDeleteAction={id => {setDeleteEntityId(id); setDeleteAlert(true)}}
                        handleEditAction={id => history.push(`/admin/answers/edit?question=${id}`)}
                        withReturnId={true}
                    />
                </Body>
            </Card>
        </Container>
        <BootstrapModalHelper
            title="Jenis Soal"
            size="lg"
            propsAction={propQuestionAddModalAlert}
            delegateHideEvent={() => setQuestionAddModalAlert(false)}
            delegateSubmitEvent={() => handleSubmitListener('create')}
        >
            <QuestionAddModalComponent delegateTextTypeChange={ev => setTypingContext(ev)} propQuestionPacket={contextQuestionPacketId} delegateEventHandler={ev => setQuestionAddEntity(ev)} />
        </BootstrapModalHelper>

        <SweetAlert {...propSuccessCreateAlert} onConfirm={() => {setSuccessCreateAlert({...propSuccessCreateAlert, show: false}); setQuestionAddModalAlert(false)}} onCancel={() => setSuccessCreateAlert({...propSuccessCreateAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propSuccessEditAlert} onConfirm={() => {setSuccessEditAlert({...propSuccessEditAlert, show: false}); setQuestionEditModalAlert(false)}} onCancel={() => setSuccessEditAlert({...propSuccessEditAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propSuccessEditQuestionPacketAlert} onConfirm={() => {setSuccessEditQuestionPacketAlert({...propSuccessEditQuestionPacketAlert, show: false})}} onCancel={() => setSuccessEditQuestionPacketAlert({...propSuccessEditAlert, show: false})}>
        </SweetAlert>
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Soal" showCancel={true} showConfirm={true} onConfirm={() => handleSubmitListener('delete')} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus Soal ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
        </SweetAlert>
    </>)
}

export default QuestionPacketEditPage