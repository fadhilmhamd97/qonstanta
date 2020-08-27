import React from "react"
import { Tabs, Tab, Card } from "react-bootstrap"
import { VideosDetailTabComponent, VideosPostTestTabComponent, VideosPostTestExplainationTabComponent } from "../component/index";

const CreateVideoLearn = ({props}) => {
    const {Title, Header, Body} = Card
    return(<>
        <Card>
            <Header>
                <Title>Tambah Video Baru</Title>
            </Header>
            <Body>
                <Tabs defaultActiveKey="general" id="videosTab" style={{marginTop: 12 + 'px', padding: 1 + 'em'}}>
                    <Tab eventKey="general" title="Detail">
                        <VideosDetailTabComponent />
                    </Tab>
                    <Tab eventKey="postTest" title="Post Test">
                        <VideosPostTestTabComponent style={{padding: '2em'}} />
                    </Tab>
                    <Tab eventKey="explaination" title="Pembahasan">
                        <VideosPostTestExplainationTabComponent style={{padding: '2em'}} />
                    </Tab>
                </Tabs>
            </Body>
        </Card>
    </>)
}

export default CreateVideoLearn