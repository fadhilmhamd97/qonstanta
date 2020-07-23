import React,{ useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { RegistrationForm } from "./component/index";

const CartRegister = (props) => {

    const {packet, packetDescription} = useSelector(state => state.registration)

    const [propTitle, setTitle] = useState(null);

    useEffect(() => {
        let _var = window.location.href.split('/')[window.location.href.split('/').length - 1]
        console.info(_var)
        setTitle(_var)
    },[])

    return(<Card>
        <CardHeader title={`${propTitle} Checkout`} />
        <CardContent style={{paddingLeft: 20 + '%', paddingRight: 20 + '%'}}>
            <RegistrationForm props={props} packet={packet} packetDescription={packetDescription} title={propTitle} />
        </CardContent>
    </Card>)
}

export default CartRegister