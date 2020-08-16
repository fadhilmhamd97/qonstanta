import React from "react"
import { Card, ProgressBar } from "react-bootstrap"
import StarIcon from '@material-ui/icons/Star'

const FacultyReviewComponent = ({name, review}) => {
    // const {appearance, teachingStyle, delivery, neatness} = review
    const {Header, Body} = Card
    return(<Card>
                <Body>
                <h4>{name}</h4>
                <p>Review berdasarkan rating</p>
                    <Card>
                        <Body>
                            <p>Kesimpulan: </p>
                            <p>
                                <StarIcon /> 5.4
                            </p>
                            <ul style={{listStyle:"none"}}>
                                <li style={{margin: '8px'}}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            Penguasaan Materi
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <ProgressBar variant="warning" now={60} />
                                                </div>
                                                <div className="col-md-4">
                                                    <div style={{position: 'relative', bottom: '5px'}}>
                                                        <StarIcon /> 4.4
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li style={{margin: '8px'}}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            Penyajian Materi
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <ProgressBar variant="warning" now={45} />
                                                </div>
                                                <div className="col-md-4">
                                                    <div style={{position: 'relative', bottom: '5px'}}>
                                                        <StarIcon /> 3.4
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li style={{margin: '8px'}}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            Ketepatan Waktu
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <ProgressBar variant="warning" now={30} />
                                                </div>
                                                <div className="col-md-4">
                                                    <div style={{position: 'relative', bottom: '5px'}}>
                                                        <StarIcon /> 2.4
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li style={{margin: '8px'}}>
                                    <div className="row">
                                        <div className="col-md-4">
                                            Komunikatif
                                        </div>
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <ProgressBar variant="warning" now={100} />
                                                </div>
                                                <div className="col-md-4">
                                                    <div style={{position: 'relative', bottom: '5px'}}>
                                                        <StarIcon /> 5.0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </Body>
                    </Card>
                </Body>
            </Card>)
}

export default FacultyReviewComponent