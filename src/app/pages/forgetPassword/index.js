import React,{useState, useEffect} from "react";
import {useSelector} from 'react-redux'
import {Card, Row, Col, Form, Button, Chec} from 'react-bootstrap'
import { changePassword } from "../../modules/Auth/_redux/authCrud";
import { Redirect } from "react-router-dom";

const ForgetPassword = ({props}) => {

    //normal validation
    const [propPassword, setPassword] = useState('')
    const [propEmail, setEmail] = useState('')

    useEffect(() => {
        setEmail(localStorage.getItem('userProps'))
    },[])

    const submitPassword = ev => {
        ev.preventDefault()
        if(propPassword !== ''){
            changePassword(propPassword).then(res => {
                alert('Password kamu berhasil diubah')
                props.history.push('/dashboard')
            },
            err => {
                alert('Terjadi kesalahan mengubah password. Silahkan coba lagi')
            })
        }
    }

    const {Header, Body, Title} = Card
    const {Group, Label, Text, Control} = Form

    return(<>
        <Card>
            <Header>Ubah Password</Header>
            <Body>
            <Form>
                <Group controlId="formBasicEmail">
                    <Label>Alamat Email</Label>
                    <Control disabled value={propEmail} type="email" placeholder="Enter email" />
                </Group>

                <Group controlId="formBasicPassword">
                    <Label>Password baru kamu</Label>
                    <Control onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Password" />
                </Group>
                <Button onClick={ev => submitPassword(ev)} style={{float: 'right'}} variant="primary">
                    Ganti Password
                </Button>
                </Form>
            </Body>
        </Card>
    </>)
}

export {ForgetPassword}