import React,{useState} from "react"
import {Tab, Tabs, ListGroup, Card} from 'react-bootstrap'
import { PostTestContainerComponent } from "./index";

const TabsComponent = ({title, description, postTest, style}) => {

    const PropSummary = ({title, description}) => {
        return(<>
            <h1>{title}</h1>
            <hr />
        <p>{description}</p>
        </>)
    }

    const PropPostTest = ({listQuestion = null}) => {
        const {Item} = ListGroup
        const {Body} = Card

        console.info(listQuestion)

        if(listQuestion){
            return(<ListGroup style={{padding: 1 + 'em'}}>
                {
                    listQuestion.map((v, i) => {
                        const {question, answers} = v
                        return(<Item key={i}>
                            <PostTestContainerComponent answers={answers} question={{index: question['id'], description: question['description']}} />
                        </Item>)
                    })
                }
            </ListGroup>)
        }

        return(<>
            <ListGroup>
                <Item></Item>
            </ListGroup>
        </>)
    }

    const [propsNavigationTabs, setNavigationTabs] = useState('description')

    return(
    <>
        <Tabs style={style} activeKey={propsNavigationTabs} onSelect={(k) => setNavigationTabs(k)} id="noanim-tab-example">
            <Tab eventKey="description" title="Deskripsi">
                <PropSummary title={title} description={description} />
            </Tab>
            <Tab eventKey="test" title="Post Test">
                <PropPostTest listQuestion={postTest} />
            </Tab>
        </Tabs>
    </>)
}

export default TabsComponent