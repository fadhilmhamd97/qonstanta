import React from "react"
import { Card, Button } from "react-bootstrap";

const AdminVideoPage = ({props}) => {
    const {Body, Header, Title} = Card
    return(<>
        <Card>
            <Header>
                <div className="row">
                    <div className="col-md-4">
                        <h5>Master Video</h5>
                    </div>
                    <div className="col-md-8">
                        <Button variant="success" style={{float: 'right'}}>Add Video</Button>
                    </div>
                </div>
            </Header>
            <Body>

            </Body>
        </Card>
    </>)
}

export default AdminVideoPage