import React from "react";
import { Modal, Button } from "react-bootstrap";

const BootstrapModalHelper = ({action, children, size, title, onHide}) => {

    const {Header, Title, Body, Footer} = Modal

    return(<>
        <Modal
            size={size} 
            centered
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
                <Button onClick={onHide}>Close</Button>
            </Footer>
        </Modal>
    </>)
}

export default BootstrapModalHelper