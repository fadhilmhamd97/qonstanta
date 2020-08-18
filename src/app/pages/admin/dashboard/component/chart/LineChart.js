import React from "react"

import { Card } from "react-bootstrap"
import { Line } from "react-chartjs-2"

const LineChartComponent = ({dataset, title}) => {
    const {Body, Header} = Card
    return(<>
        <Card>
            <Header>
                {title}
            </Header>
            <Body>
                <Line data={dataset} />
            </Body>
        </Card>
    </>)
}

export default LineChartComponent