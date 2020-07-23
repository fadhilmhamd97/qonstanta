import React from "react";
import { Card } from "react-bootstrap";

const HistoryCardComponent = (props) => {

    const {Body, Title, Subtitle, Text, Link} = Card

    return(<>
        <Card>
        <Body>
            <Title>Card Title</Title>
            <Subtitle className="mb-2 text-muted">History Try Out</Subtitle>
            <Link href="#">Card Link</Link>
            <Link href="#">Another Link</Link>
        </Body>
        </Card>
        </>)
}

export default HistoryCardComponent