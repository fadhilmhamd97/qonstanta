import React from "react"
import { Container, Form, Col, Row, Button } from "react-bootstrap"
import Dropzone from "react-dropzone"

const CreateEbookModalComponent = ({props}) => {

    const {Control, Label, Group, Area} = Form

    return(<>
        <Form>
            <Group as={Row} controlId="formVideoId">
                <Label column md="4">Id</Label>
                <Col md="8">
                    <Control type="number" placeholder="Id" />
                </Col>
            </Group>
            <Group as={Row} controlId="formVideoTitle">
                <Label column md="4">Judul</Label>
                <Col md="8">
                    <Control type="text" placeholder="Judul" />
                </Col>
            </Group>
            <Group as={Row} controlId="formVideoDescription">
                <Label column md="4">Deskripsi</Label>
                <Col md="8">
                    <Control as="textarea" type="text" placeholder="Deskripsi" />
                </Col>
            </Group>

            <Group>
                <Label>Upload Video</Label>
                <hr />
                <div>
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()} style={{minHeight: '180px', border:'4px solid #51c2c4', borderRadius: '12px', textAlign: 'center'}}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
            </Group>
            <Button variant="success">Submit</Button>
        </Form>    
    </>)
}

export default CreateEbookModalComponent