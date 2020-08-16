import React from "react";
import { Card, Button } from "react-bootstrap";


//HOC for Bootstrap Card
const BootstrapCard = ({title = null, className = null,onClick, header = null, children, headerStyle, propButton, style, noFooter = null}) => {

    const {Header, Title, Body, Footer} = Card

    const PropsHeader = ({header, headerStyle}) => {
        if(header)
            return(<Header style={headerStyle}>{header}</Header>)

        return(<></>)
    }

    const PropsTitle = ({title}) => {
        if(title)
            return(<Title>
                {title}
            </Title>)

        return(<></>)
    }

    const PropsButton = ({propButton}) => {
        
        if(propButton)
            return(<>
                <Button variant={propButton.variant}>
                    {propButton.title}
                </Button>
            </>)

        return(<></>)
    }

    const PropFooter = ({noFooter, propButton}) => {
        return noFooter ? (<></>) : (<Footer>
            <PropsButton propButton={propButton} />
        </Footer>)
    }

    return(<>
        <Card className={className} style={style} onClick={onClick}>
            <PropsHeader header={header} headerStyle={headerStyle} />
            <Body>
                <PropsTitle title={title} />
                {children}
            </Body>
            <PropFooter noFooter={noFooter} propButton={propButton} />
        </Card>
    </>)
}

export default BootstrapCard