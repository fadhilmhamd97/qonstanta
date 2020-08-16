import React from "react"

import { Card } from "react-bootstrap"
import { Pie } from "react-chartjs-2";

const PieByPackageComponent = ({dataset}) => {
    const {Body, Header} = Card
    return(<>
        <Card>
            <Header>
                Siswa Berdasarkan Paket
            </Header>
            <Body>
                <Pie data={dataset} />
            </Body>
        </Card>
    </>)
}

export default PieByPackageComponent