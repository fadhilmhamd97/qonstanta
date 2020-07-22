/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React,{useEffect, useState} from "react";
import { getModules } from "../../../modules/Module/_redux/moduleCrud";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

export function JadwalList({ props }) {

  const [propModules, setModules] = useState([]);

  useEffect(() => {
        getModules().then(res => {
            console.info(res.data.data)
            setModules(res.data.data);
        })
  },[])


  const useStyles = makeStyles(theme => ({
    card: {
      width: '350px',
      margin: 'auto'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));


  const CardComponent = ({title, code, price, priceMember, freeLimit}) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton aria-label="Settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={code}
            subheader={price}
          />
          <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {title}
            </Typography>
          </CardContent>
          <CardActions style={{margin: 'auto', position: 'relative', left: 40 +'%'}} disableSpacing>
            <Link to={`module/register/${code}`}>
                <IconButton aria-label="Ikut Ujian">
                    <EditIcon />
                </IconButton>
            </Link>
          </CardActions>
        </Card>
      );
  }

  return (
    <div className={`card card-custom bg-gray-100`}>
      {/* Header */}
      <div className="card-header border-0 bg-danger py-5">
        <h3 className="card-title font-weight-bolder text-white">Pilih Jadwal</h3>
      </div>
      {/* Body */}
      <div className="card-body p-0 position-relative overflow-hidden">

        {/* Stat */}
        <div className="card-spacer">

          <div className="row m-0">
            {propModules.map((v, i) => {
                return(<CardComponent key={i} title={v.name} code={v.code} price={v.price} />)
            })}
          </div>

        </div>

        {/* Resize */}
        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: "411px", height: "461px" }} />
          </div>
          <div className="contract-trigger" />
        </div>
      </div>
    </div>
  );
}
