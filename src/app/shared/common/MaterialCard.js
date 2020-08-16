import React from "react";

//HOC for Material Card
import 
    { 
        Card,
        CardHeader,
        CardContent,
        CardActions
    } from "@material-ui/core";

const MaterialCard = ({children, title, subHeader, btnProps, variant, actionHeader = null, avatar = null}) => {
    return(<>
        <Card>
            <CardHeader 
                avatar={avatar}
                action={actionHeader}
                title={title}
                subheader={subHeader}
            />
            <CardContent>
                {children}
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    </>)
}

export default MaterialCard