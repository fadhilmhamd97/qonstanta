import React from "react"
import { Container, Card, Button } from "react-bootstrap"
import { MaterialTable } from "../../../shared/common/index"
import { eduliveColumnsData, eduliveDatasets } from "./_data"

import { Link } from "react-router-dom";

import { FilterFormControlsComponent } from "./component/index";

const MasterEduLive = ({props}) => {

    const {Body, Title, Header} = Card

    return(<Container>
        <FilterFormControlsComponent />
        <Card style={{marginTop: '12px'}}>
            <Body>
                <Link to="/admin/edulive/create">
                    <Button variant="success" style={{float: 'right'}}>
                        Tambah Jadwal
                    </Button>
                </Link>
                <div style={{margin: '18px'}}>
                    <MaterialTable actions={['edit','delete']} datasets={eduliveDatasets} columns={eduliveColumnsData} />
                </div>
            </Body>
        </Card>
    </Container>)
}

export default MasterEduLive