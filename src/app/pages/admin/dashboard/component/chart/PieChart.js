import React from "react"

import { Card } from "react-bootstrap"
import { Pie } from "react-chartjs-2";

const PieChartComponent = ({dataset, title}) => {
    const {Body, Header} = Card
    return(<>
        <Card>
            <Header>
                {title}
            </Header>
            <Body>
                <Pie data={dataset} />
            </Body>
        </Card>
    </>)
}

export default PieChartComponent