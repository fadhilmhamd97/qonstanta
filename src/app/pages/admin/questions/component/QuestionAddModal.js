import React,{ useState, useEffect } from "react"
import { Card, Container, Form, Row, Col } from "react-bootstrap"
import Dropzone from "react-dropzone"
import SunEditor from "suneditor-react"
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import * as services from "../question-service";

const QuestionAddModalComponent = ({delegateEventHandler, propQuestionPacket, delegateTextTypeChange}) => {
    const {Header, Body, Title} = Card
    const {Group, Control, Label} = Form

    const [propContextQuestion, setContextQuestion] = useState({
        questionType: '',
        question: '',
        imageUrl: '',
        imageName: '',
        videoUrl: '',
        videoName: '',
        questionPacketId: parseInt(propQuestionPacket),
        explanationId: undefined,
        imageBase64: undefined,
        videoBase64: ''
    })

    const [propExplanationList, setExplanationList] = useState([])

    {/* Sun Editor makes change every seconds, all the props would be affected due the process */}
    {/* TODO: MOVE THESE TO REDUX STORE */}

    useEffect(() => {
        delegateEventHandler(propContextQuestion)
    },[propContextQuestion])

    useEffect(() => {
        getExplanationList()
    }, [])

    const getExplanationList = async () => {
        services.getExplanationList().then(res => {
            const {data} = res.data
            setExplanationList(data)
        }, err => {

        })
    }

    const handleDropImage = props => {
        const {name} = props[0]
        var reader = new FileReader()
        reader.readAsDataURL(props[0])
        reader.onload = () => {
            setContextQuestion({...propContextQuestion, imageBase64: reader.result, imageName: name, question: '-- IMAGE TYPE --'})
        }
    }

    const handleTextChange = content => {
        delegateTextTypeChange(content)
    }

    const [propOptionInsertType, setOptionInsertType] = useState(0)
    return(<Form>
        <Group as={Row}>
            <Label column md="4">Tipe Soal</Label>
            <Col md="8">
                <Control type="text" placeholder="Tipe Soal" onChange={ev => setContextQuestion({...propContextQuestion, questionType: ev.target.value})} />
            </Col>
        </Group>
        <Group as={Row}>
            <Label column md="4">Penjelasan</Label>
            <Col md="8">
                <Control as="select" defaultValue="0" onChange={ev => setContextQuestion({...propContextQuestion, explanationId: parseInt(ev.currentTarget.value)})}>
                    <option value="0">-- Pilih Penjelasan --</option>
                    {propExplanationList.map((v, i) => {
                        const {description} = v
                        const substr = description.substring(0,50) + '...'
                        return(<option value={v['id']} key={i}>{substr}</option>)
                    })}
                </Control>
            </Col>
        </Group>
        <Group> 
            <Label>Jenis Soal</Label>
            <Control as="select" defaultValue="text" onChange={ev => setOptionInsertType(ev.currentTarget.value)}>
                <option value="text">Text</option>
                <option value="image">Image</option>
            </Control>
        </Group>
        <Container>
            {propOptionInsertType === 'image' ? <Dropzone onDrop={acceptedFiles => handleDropImage(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()} style={{minHeight: '180px', border:'4px solid #51c2c4', borderRadius: '12px', textAlign: 'center'}}>
                                <input {...getInputProps()} />
                                <p>{propContextQuestion['imageName'] === '' ? 'Drag n Drop some files here, or click to select files' : propContextQuestion['imageName']}</p>
                            </div>
                            </section>
                        )}
                    </Dropzone> : <SunEditor onChange={content => handleTextChange(content)} height="320" />}
        </Container>
    </Form>)
}

export default QuestionAddModalComponent