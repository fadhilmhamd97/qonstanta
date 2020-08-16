import React from "react";
import { Card, Accordion, Button } from "react-bootstrap";

const BootstrapAccordion = ({props, children}) => {

    const {Header, Footer, Body}  = Card
    const {Toggle, Collapse} = Accordion

    return(<>
        <Accordion defaultActiveKey="0">
            {props.map((v, i) => {
                const {title} = v
                return(<Card>
                    <Header>
                        <Toggle as={Button} variant="link" eventKey={i}>
                            {title}
                        </Toggle>
                    </Header>
                    <Collapse eventKey={i}>
                        <Body>
                            {children}
                        </Body>
                    </Collapse>
                </Card>)
            })}
        </Accordion>
    </>)
}

export default BootstrapAccordion