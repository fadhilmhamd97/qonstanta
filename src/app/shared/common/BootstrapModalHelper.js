import React,{useEffect, useState} from "react";
import { Modal, Button } from "react-bootstrap"

const BootstrapModalHelper = ({propsAction, children, size, title, delegateHideEvent, delegateSubmitEvent=undefined}) => {

    const {Header, Title, Body, Footer} = Modal

    const [propsModalState, setModalState] = useState(false)

    useEffect(cb => {
        setModalState(propsAction)
    }, [propsAction])

    return(<>
        <Modal
            size={size} 
            centered
            show={propsModalState}
            onHide={delegateHideEvent}
        >
            <Header closeButton>
                <Title>
                    {title}
                </Title>
            </Header>
            <Body>
                {children}
            </Body>
            <Footer>
                <Button onClick={delegateHideEvent}>Close</Button>
                {delegateSubmitEvent !== undefined ? <Button onClick={delegateSubmitEvent}>Submit</Button> : <></>}
            </Footer>
        </Modal>
    </>)
}

export default BootstrapModalHelper