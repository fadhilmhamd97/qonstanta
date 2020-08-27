import React,{ useState } from "react"
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap"

const styles = {
    containerOption: 
    {
        padding: '3em',
        textAlign: 'center',
        backgroundColor: '#dcdcdc'
    }
}

const CreateQuestionModalComponent = ({props, delegateQuestionEvent, delegateQuestionOption}) => {

    const {Label, Control, Group} = Form
    return(<>
        <Form>
            <Group as={Row}>
                <Label>Soal</Label>
                <Container style={styles.containerOption}>
                    <Button onClick={delegateQuestionEvent}>Tambah Soal</Button>
                </Container>
            </Group>
            <Group>
                <Label>Opsi A</Label>
                <Container style={styles.containerOption}>
                    <Button onClick={delegateQuestionOption}>Tambah Opsi A</Button>
                </Container>
            </Group>
            <Group>
                <Label>Opsi B</Label>
                <Container style={styles.containerOption}>
                    <Button onClick={delegateQuestionOption}>Tambah Opsi B</Button>
                </Container>
            </Group>
            <Group>
                <Label>Opsi C</Label>
                <Container style={styles.containerOption}>
                    <Button onClick={delegateQuestionOption}>Tambah Opsi C</Button>
                </Container>
            </Group>
            <Group>
                <Label>Opsi D</Label>
                <Container style={styles.containerOption}>
                    <Button onClick={delegateQuestionOption}>Tambah Opsi D</Button>
                </Container>
            </Group>
            <Group>
                <Label>Opsi E</Label>
                <Container style={styles.containerOption}>
                    <Button onClick={delegateQuestionOption}>Tambah Opsi E</Button>
                </Container>
            </Group>
            <Group>
                <Label>Skor</Label>
                <Control type="number" placeholder="Skor" />
            </Group>
        </Form>
    </>)
}

export default CreateQuestionModalComponent