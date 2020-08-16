import React,{useState} from "react";
import { BootstrapCard } from "../../../shared/common/index";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";
import Typography from '@material-ui/core/Typography';
import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const ScheduleComponent = ({props}) => {
    return(<>
        <div className="row">
            {props.map((v, i) => {
                const {title, icon, classRoom, faculty, modules, schedule, status} = v
                return(
                    <BootstrapCard
                        headerStyle={{fontSize: 17 + 'px', backgroundColor: '#3699ff', color: 'white'}}
                        style={{width: 100 + '%', margin: 12 + 'px'}}
                        header={title}
                        noFooter={true}
                        >
                        <Link to={`/edulive/session?class=${classRoom}`}>
                            <div className="row" style={status === 0 ? {cursor: 'not-allowed' } : {cursor: 'pointer'}}>
                                <div className="col-md-3 col-sm-4" style={{textAlign: 'center'}}>
                                    <img style={{width: 100 + '%'}} src={toAbsoluteUrl(`/media/svg/edulive/${icon}`)} width="100%" alt={`img-${i}`} />
                                </div>
                                <div className="col-md-9 col-sm-8">
                                <Typography variant="body1" gutterBottom>
                                    {modules}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {classRoom}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {faculty}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <i style={{fontSize: 12 + 'px'}}>{schedule}</i>
                                </Typography>
                                <p>
                                    {status === 0 ? <Badge variant="secondary">Tidak Aktif</Badge> : <Badge variant="primary">Aktif</Badge>}
                                </p>
                                </div>
                            </div>
                            <i style={{position: 'relative', float:'right', color: 'red'}}>(Klik untuk masuk)</i>
                        </Link>
                    </BootstrapCard>)
            })}
        </div>
    </>)
}

export default ScheduleComponent