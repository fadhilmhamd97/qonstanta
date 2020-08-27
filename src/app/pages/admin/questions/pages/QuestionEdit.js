import React,{ useState, useEffect } from "react"
import { Form, Row, Col, Button, Container, Card } from "react-bootstrap"
import * as services from "../question-service"
import { MaterialTable, BootstrapModalHelper } from "../../../../shared/common/index"
import SweetAlert from "react-bootstrap-sweetalert"
import { AnswerAddModalComponent, AnswerEditModalComponent, QuestionEditFormComponent } from "../component/index"

const QuestionEditPage = ({props}) => {
    const {Group, Label, Control, Check} = Form
    const {Header, Body, Title} = Card

    //define the columns
    const answerListColumns = [
        {title: 'Id', value: 'id'},
        {title: 'Jawaban', value: 'choice'},
        {title: 'Jawaban Sebenarnya', value: 'correctChoice'},
        {title: 'Image', value: 'imageUrl'},
        {title: 'Aktif', value: 'isActive'}
    ]

    const [propFormDetailData, setFormDetailData] = useState({
        questionType: '',
        question: '',
        imageUrl: '',
        imageName: '',
        videoUrl: false,
        videoName: false,
        questionPacketId: undefined,
        explanationId: undefined,
        imageBase64: '',
        videoBase64: ''
    })

    const [propFormulaList, setFormulaList] = useState([])
    const [propPublishCondition, setPublishCondition] = useState(false)
    const [propActiveCondition, setActiveCondition] = useState(false)
    const [propQuestionPacketType, setQuestionPacketType] = useState([])
    const [propQuestionList, setQuestionList] = useState([])
    const [propAnswerQuestionAddModalAlert, setAnswerQuestionAddModalAlert] = useState(false)
    const [propAnswerQuestionEditModalAlert, setAnswerQuestionEditModalAlert] = useState(false)
    const [propSuccessCreateAlert, setSuccessCreateAlert] = useState({show: false, title: ''})
    const [propSuccessEditAlert, setSuccessEditAlert] = useState({show: false, title: ''})
    const [propDeleteAlert, setDeleteAlert] = useState(false)
    const [propExplainationList, setExplainationList] = useState([])
    const [propSuccessDeleteAlert, setSuccessDeleteAlert] = useState({show: false, title: ''})

    const [propAnswerQuestionAddEntity, setAnwerQuestionAddEntity] = useState({})
    const [propAnswerQuestionEditEntity, setAnwerQuestionEditEntity] = useState({})

    const [propAnswerList, setAnswerList] = useState([])

    const [propAnswerQuestionEditEntityId, setAnswerQuestionEditEntityId] = useState(undefined)

    const [propDeleteEntityId, setDeleteEntityId] = useState(undefined)

    const [propSuccessQuestionEditAlert,setSuccessQuestionEditAlert] = useState({show: false, title: ''})

    const contextQuestionId = new URLSearchParams(window.location.search).get('question')
    const [propTypingContext, setTypingContext] = useState(undefined)

    useEffect(() => {
        populateDetailQuestion(contextQuestionId)
        populateExplanation()
        populateAnswerList(contextQuestionId)
    },[])

    const populateDetailQuestion = async id => {
        services.getQuestionById(id).then(res => {
            const {data} = res.data
            const {isActive,questionType, question, imageUrl, imageName, videoUrl, videoName, questionPacketId, explanationId, imageBase64, videoBase64} = data
            setFormDetailData({isActive,questionType, question, imageUrl, imageName, videoUrl, videoName, questionPacketId, explanationId, imageBase64, videoBase64})
            setActiveCondition(isActive)
        })
    }

    const populateExplanation = async id => {
        services.getExplanationList().then(res => {
            const {data} = res.data
            setExplainationList(data)
        })
    }

    const populateAnswerList = async id => {
        services.getAnswersList().then(res => {
            const {data} = res.data
            const _filtered = data.filter(v => {
                return v['questionId'] == id
            })
            setAnswerList(_filtered)
        })
    }

    const handleQuestionEditListener = () => {
        const _ctx = propFormDetailData['question'] !== '-- IMAGE TYPE --' ? propTypingContext : '-- IMAGE TYPE --'
            
            services.patchQuestion({...propFormDetailData, question: _ctx}, contextQuestionId).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Soal {contextQuestionId} berhasil diubah</span>
                }
                setSuccessQuestionEditAlert(_alert)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat mengubah {contextQuestionId}</span>
                }
                setSuccessQuestionEditAlert(_alert)
            })
    }

    const handleSubmitListener = action => {
        if(action === 'create'){
            services.postAnswer(propAnswerQuestionAddEntity).then(res => {
                const _alert = {
                    success: true,
                    show: true,
                    title: 'Perhatian',
                    children: <span>Soal {propAnswerQuestionAddEntity['id']} berhasil ditambahkan</span>
                }
                setSuccessCreateAlert(_alert)
                populateAnswerList(contextQuestionId)
            }, err => {
                const _alert = {
                    error: true,
                    show: true,
                    title: 'Terjadi kesalahan!',
                    children: <span>Terjadi kesalahan saat menambah {propAnswerQuestionAddEntity['code']}</span>
                }
                setSuccessCreateAlert(_alert)
                populateAnswerList(contextQuestionId)
            })
        }
        if(action === 'edit')
        services.patchAnswer(propAnswerQuestionEditEntity, propAnswerQuestionEditEntityId).then(res => {
            const _alert = {
                success: true,
                show: true,
                title: 'Perhatian',
                children: <span>Jawaban {propAnswerQuestionEditEntityId} berhasil diubah</span>
            }
            setSuccessEditAlert(_alert)
        }, err => {
            const _alert = {
                error: true,
                show: true,
                title: 'Terjadi kesalahan!',
                children: <span>Terjadi kesalahan saat mengubah {propAnswerQuestionEditEntityId}</span>
            }
            setSuccessEditAlert(_alert)
            populateAnswerList(contextQuestionId)
        })
        if(action === 'delete')
        services.deleteAnswer(propDeleteEntityId).then(res => {
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
                populateAnswerList(contextQuestionId)
            })
    }

    const handleQuestionEdit = data => {
        
    }

    const handleEditModalListener = id => {
        setAnswerQuestionEditModalAlert(true)
        setAnswerQuestionEditEntityId(id)
    }
    
    return(<>
        <Container>
            <Card>
                <Header>{`Edit Question - ${contextQuestionId}`}</Header>
                <Body>
                    <QuestionEditFormComponent delegateSubmitEvent={() => handleQuestionEditListener()} delegateTextTypeChange={ev => setTypingContext(ev)} propQuestionEditEntityId={contextQuestionId} delegateEventHandler={ev => setFormDetailData} />
                </Body>
            </Card>
            <Card style={{marginTop: '2em'}}>
                <Body>
                    <h4>Jawaban</h4>
                    <hr />
                    <Button onClick={() => setAnswerQuestionAddModalAlert(true)} style={{float: 'right', margin:'14px'}} variant="success">Tambah Jawaban</Button>
                    <MaterialTable
                        actions={['edit','delete']}
                        columns={answerListColumns}
                        datasets={propAnswerList}
                        handleEditAction={id => {handleEditModalListener(id)}}
                        handleDeleteAction={id => {setDeleteEntityId(id); setDeleteAlert(true)}}
                        withReturnId={true}
                    />
                </Body>
            </Card>
        </Container>
        <BootstrapModalHelper
            title="Tambah Jawaban"
            size="lg"
            propsAction={propAnswerQuestionAddModalAlert}
            delegateHideEvent={() => setAnswerQuestionAddModalAlert(false)}
            delegateSubmitEvent={() => handleSubmitListener('create')}
        >
            <AnswerAddModalComponent propQuestionId={contextQuestionId} delegateEventHandler={ev => setAnwerQuestionAddEntity(ev)} />
        </BootstrapModalHelper>

        <BootstrapModalHelper
            title="Edit Jawaban"
            size="lg"
            propsAction={propAnswerQuestionEditModalAlert}
            delegateHideEvent={() => setAnswerQuestionEditModalAlert(false)}
            delegateSubmitEvent={() => handleSubmitListener('edit')}
        >
            <AnswerEditModalComponent propContextId={propAnswerQuestionEditEntityId} propQuestionId={contextQuestionId} delegateEventHandler={ev => setAnwerQuestionEditEntity(ev)} />
        </BootstrapModalHelper>

        <SweetAlert {...propSuccessCreateAlert} onConfirm={() => {setSuccessCreateAlert({...propSuccessCreateAlert, show: false}); setAnswerQuestionAddModalAlert(false)}} onCancel={() => setSuccessCreateAlert({...propSuccessCreateAlert, show: false})}>
        </SweetAlert>
        <SweetAlert {...propSuccessEditAlert} onConfirm={() => {setSuccessEditAlert({...propSuccessEditAlert, show: false}); setAnswerQuestionEditModalAlert(false)}} onCancel={() => setSuccessEditAlert({...propSuccessEditAlert, show: false})}>
        </SweetAlert>
        <SweetAlert danger={true} show={propDeleteAlert} title="Hapus Jawaban" showCancel={true} showConfirm={true} onConfirm={() => handleSubmitListener('delete')} onCancel={() => setDeleteAlert(false)}>
            Apakah anda yakin ingin menghapus Jawaban ?
        </SweetAlert>
        <SweetAlert {...propSuccessDeleteAlert} onConfirm={() => {setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false}); setDeleteAlert(false)}} onCancel={() => setSuccessDeleteAlert({...propSuccessDeleteAlert, show: false})}>
        </SweetAlert>

        <SweetAlert {...propSuccessQuestionEditAlert} onConfirm={() => {setSuccessQuestionEditAlert({...propSuccessQuestionEditAlert, show: false}); setSuccessQuestionEditAlert(false)}} onCancel={() => setSuccessQuestionEditAlert({...propSuccessQuestionEditAlert, show: false})}>
        </SweetAlert>
    </>)
}

export default QuestionEditPage