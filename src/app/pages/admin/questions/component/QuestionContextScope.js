import React,{ useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import SunEditor from "suneditor-react"
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Dropzone from "react-dropzone"

const QuestionContextScopeComponent = ({props}) => {

    const [propTypingContext, setTypingContext] = useState("text")
    const {Control, Label, Group} = Form
    return(
        <>
        <Form>
            <Group>
                <Label md="4" column>Jenis Soal</Label>
                <Control as="select" onChange={ev => setTypingContext(ev.currentTarget.value)} defaultValue={propTypingContext}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </Control>
            </Group>
            <Container>
                {propTypingContext === 'text' ? <SunEditor height="320" /> : 
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()} style={{minHeight: '240px', border:'4px solid #51c2c4', borderRadius: '12px', textAlign: 'center'}}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
                }
            </Container>
        </Form>
        <Button style={{marginTop: '18px'}} variant="success">Submit</Button>
        </>
    )
}

export default QuestionContextScopeComponent