import React,{useState} from "react";
import { Tabs, Tab } from "react-bootstrap";

const PropSummary = ({title, description}) => {
    return(<>
        <h1>{title}</h1>
        <hr />
    <p>{description}</p>
    </>)
}

const TabsComponent = ({title, description, postTest, style}) => {

    const [propsNavigationTabs, setNavigationTabs] = useState('description')

    return(
        <>
            <Tabs style={style} activeKey={propsNavigationTabs} onSelect={(k) => setNavigationTabs(k)} id="noanim-tab-example">
                <Tab eventKey="description" title="Deskripsi">
                    <PropSummary title={title} description={description} />
                </Tab>
            </Tabs>
        </>)
}

export default TabsComponent