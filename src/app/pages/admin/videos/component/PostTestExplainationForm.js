import React,{useState} from "react"
import { Form, Row, Col, Container } from "react-bootstrap"

import SunEditor from "suneditor-react"
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Dropzone from "react-dropzone"

const PostTestExplainationFormComponent = ({props}) => {
    const {Group, Label, Control} = Form

    const [propExplainationType, setExplainationType] = useState("text")

    return(<>
        <Form>
            <Group>
                <Label>Bentuk Pembahasan</Label>
                <Control as="select" defaultValue="text" onChange={ev => setExplainationType(ev.currentTarget.value)}>
                    <option value="text">Text</option>
                    <option value="video">Video</option>
                    <option value="pdf">Pdf</option>
                </Control>
            </Group>
        </Form>
        {/* HERE ARE CONTAINER OF CONTEXT SCOPE */}
        <Container>
            {propExplainationType === 'text' ? <SunEditor height="320" /> : 
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
    </>)
}

export default PostTestExplainationFormComponent