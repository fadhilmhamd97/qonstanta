import React,{ useState, useEffect } from "react"
import { Card, Container, Form, Row, Col } from "react-bootstrap"
import Dropzone from "react-dropzone"

const QuestionAddModalComponent = ({delegateEventHandler, propQuestionId}) => {
    const {Group, Control, Label} = Form

    const [propContextAnswer, setContextAnswer] = useState({
        choice: '',
        correctChoice: '',
        questionId: parseInt(propQuestionId),
        imageBase64: undefined,
        imageName: ''
    })

    useEffect(() => {
        delegateEventHandler(propContextAnswer)
    },[propContextAnswer])

    const handleDropImage = props => {
        const {name} = props[0]
        var reader = new FileReader()
        reader.readAsDataURL(props[0])
        reader.onload = () => {
            setContextAnswer({...propContextAnswer, imageBase64: reader.result, imageName: name})
        }
    }

    return(<Form>
        <Group as={Row}>
            <Label column md="4">Jawaban</Label>
            <Col md="8">
                <Control type="text" placeholder="Jawaban" onChange={ev => setContextAnswer({...propContextAnswer, choice: ev.target.value})} />
            </Col>
        </Group>
        <Group as={Row}>
            <Label column md="4">Jawaban Sebenarnya</Label>
            <Col md="8">
                <Control type="text" placeholder="Jawaban Sebenarnya" onChange={ev => setContextAnswer({...propContextAnswer, correctChoice: ev.target.value})} />
            </Col>
        </Group>
        <Container>
            <h3>Isi Jawaban</h3>
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

export default QuestionAddModalComponent