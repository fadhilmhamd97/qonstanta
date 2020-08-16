import React from "react";
import {Badge, Button, Dropdown, Row, Col} from "react-bootstrap";
import Typography from '@material-ui/core/Typography'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";

const JadwalCardComponent = ({title, name, description, image, limit, moduleChoose, id}) => { 

        const eventDelegates = () => {
            moduleChoose(title, name)
        }

        return(<div className={`card`} style={{marginTop: 1.5 + 'em'}}>
        {/* Header */}
        <div className="border-0 pt-5" style={{margin: 'auto', paddingTop: .8 + 'em'}}>
            <h3 className="card-title font-weight-bolder ">{title}</h3>
        </div>
        {/* Body */}
        <div className="card-body d-flex flex-column" style={{padding: 0}}>
          <div className="flex-grow-1">
            <div id="kt_mixed_widget_14_chart" style={{height: "200px"}}>
                <img src={image} alt={name} style={{width: 100 + '%'}} />
            </div>
          </div>
          <div className="pt-5">
            <Typography style={{textAlign: 'center'}} variant="body2" color="textSecondary" component="p">
              {name}
            </Typography>
            <div style={{textAlign: 'center'}}>
              <Button variant="warning" style={{marginTop: 2 + 'em'}}>
                  <span style={{fontSize: 11 + 'px'}}>Try out gratis untuk:</span> <Badge variant="light">{limit}</Badge>
              </Button>
            </div>
            <br />
            <Link to={`module/register/${id}`}>
              <Button onClick={() => eventDelegates()} className="btn btn-danger btn-shadow-hover font-weight-bolder w-100 py-3">
                  <span>&nbsp; Registrasi</span> 
                  <span style={{float: 'right'}}><ArrowForwardIosIcon /></span>
              </Button>
              </Link>
          </div>
        </div>
      </div>)
}

export default JadwalCardComponent