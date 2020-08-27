import React,{ useState, useEffect } from "react"
import { Card, Container, Form, Row, Col } from "react-bootstrap"
import Dropzone from "react-dropzone"
import * as service from "../question-service"

const AnswerEditModalComponent = ({delegateEventHandler, propQuestionId, propContextId}) => {
    const {Group, Control, Label} = Form

    const [propContextAnswer, setContextAnswer] = useState({
        choice: '',
        correctChoice: '',
        questionId: parseInt(propQuestionId),
        imageBase64: undefined,
        imageName: '',
        imageUrl: ''
    })

    useEffect(() => {
        delegateEventHandler(propContextAnswer)
    },[propContextAnswer])

    useEffect(() => {
        service.getAnswerById(propContextId).then(res => {
            const {data} = res.data
            const {choice, imageUrl,correctChoice, imageBase64, imageName} = data
            setContextAnswer({choice, imageUrl,correctChoice, imageBase64, imageName})
        }, err => alert('error'))
    }, [])

    const handleDropImage = props => {
        const {name} = props[0]
        var reader = new FileReader()
        reader.readAsDataURL(props[0])
        reader.onload = () => {
            setContextAnswer({...propContextAnswer, imageBase64: reader.result, imageName: name, question: '-- IMAGE TYPE --'})
        }
    }

    return(<Form>
        <Group as={Row}>
            <Label column md="4">Jawaban</Label>
            <Col md="8">
                <Control type="text" value={propContextAnswer['choice']} placeholder="Jawaban" onChange={ev => setContextAnswer({...propContextAnswer, choice: ev.target.value})} />
            </Col>
        </Group>
        <Group as={Row}>
            <Label column md="4">Jawaban Sebenarnya</Label>
            <Col md="8">
                <Control type="text" value={propContextAnswer['correctChoice']} placeholder="Jawaban Sebenarnya" onChange={ev => setContextAnswer({...propContextAnswer, correctChoice: ev.target.value})} />
            </Col>
        </Group>
        <Group as={Row}>
            <Label column md="4">Url</Label>
            <Col md="8">
                <Control type="text" disabled={true} value={propContextAnswer['imageUrl']}  />
            </Col>
        </Group>
        <Container>
            <Dropzone onDrop={acceptedFiles => handleDropImage(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()} style={{minHeight: '180px', border:'4px solid #51c2c4', borderRadius: '12px', textAlign: 'center'}}>
                                <input {...getInputProps()} />
                                <p>{propContextAnswer['imageName'] === '' ? 'Drag n Drop some files here, or click to select files' : propContextAnswer['imageName']}</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
        </Container>
    </Form>)
}

export default AnswerEditModalComponent