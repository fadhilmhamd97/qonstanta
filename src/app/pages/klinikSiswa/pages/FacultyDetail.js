import React,{useState} from "react"
import { Card, Tab, Tabs, } from "react-bootstrap"
import { FacultyReviewComponent, FacultyDiscussionComponent } from "./components/index"
import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers"

const FacultyDetail = ({props}) => {
    const {Header, Body} = Card

    const [propTabs, setTabs] = useState("ulasan")

    return(
        <Card>
            <Body>
                <h2>Fadhil Muhammad</h2>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <img style={{maxWidth: '320px'}} src={toAbsoluteUrl('/media/faculty/fadhil.jpg')} alt="fadhil-image" />
                    </div>
                    <div className="col-md-8">
                    <div className="row">
                        <label className="col-md-4">Deskripsi</label>
                        <div className="col-md-8">
                            Best Friend Mark Zukerberg, Bill Gates, dan sering ngoding bareng Steve Jobs waktu di Harvard
                        </div>
                    </div>
                    <div className="row">
                        <label className="col-md-4">Jadwal</label>
                            <div className="container">
                                <Card style={{height: 125 + 'px', overflowX: 'scroll', overflowY: 'hidden'}}>
                                    <Body style={{padding: '9.8px'}}>
                                        <Card style={{maxWidth: '80px', height: '100%', margin: 'auto'}}>
                                            <Body style={{padding: 1, textAlign: 'center'}}>
                                                <h5>28</h5>
                                                September 2020
                                                <p>11:00 - 12:00</p>
                                            </Body>
                                        </Card>
                                    </Body>
                                </Card>
                            </div>
                    </div>
                    <br />
                </div>
             </div>
                {/* Here are tabs for Review And Progress Star Rating */}
                <Tabs style={{marginTop: 12 + 'px', padding: 1.7 + 'em'}} activeKey={propTabs} onSelect={(k) => setTabs(k)}>
                    <Tab eventKey="ulasan" title="Ulasan">
                        <FacultyReviewComponent name="Fadhil" />
                    </Tab>
                    <Tab eventKey="diskusi" title="Diskusi">
                        <FacultyDiscussionComponent />
                    </Tab>
                </Tabs>
            </Body>
        </Card>)
}

export default FacultyDetail