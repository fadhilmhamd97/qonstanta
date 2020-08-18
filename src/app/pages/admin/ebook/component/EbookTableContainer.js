import React from "react"
import { MaterialTable } from "../../../../shared/common/index"
import { Card, Button } from "react-bootstrap"

const EbookTableContainerComponent = ({columns, datasets, title}) => {
    const {Title, Body, Header} = Card

    const actions = ['add','edit','delete']
    
    return(<>
        <Card>
            <Header>
                <div className="row">
                    <div className="col-md-6">
                        <Title>{title}</Title>
                    </div>
                    <div className="col-md-6">
                        <Button variant='success' style={{float: 'right'}}>
                            Tambah Ebook
                        </Button>
                    </div>
                </div>
            </Header>
            <Body>
                <MaterialTable columns={columns} datasets={datasets} actions={actions} />
            </Body>
        </Card>
    </>)
}

export default EbookTableContainerComponent