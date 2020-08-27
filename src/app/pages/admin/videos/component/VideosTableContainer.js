import React from "react"
import { MaterialTable } from "../../../../shared/common/index"
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const VideoTableContainerComponent = ({columns, datasets, title}) => {
    const {Title, Body, Header} = Card

    const actions = ['edit','delete']
    
    return(<>
        <Card>
            <Header>
                <div className="row">
                    <div className="col-md-6">
                        <Title>{title}</Title>
                    </div>
                    <div className="col-md-6">
                        <Link to="/admin/videos/create?id=2">
                            <Button variant='success' style={{float: 'right'}}>
                                Tambah Video
                            </Button>
                        </Link>
                    </div>
                </div>
            </Header>
            <Body>
                <MaterialTable columns={columns} datasets={datasets} actions={actions} />
            </Body>
        </Card>
    </>)
}

export default VideoTableContainerComponent