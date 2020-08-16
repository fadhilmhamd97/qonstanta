import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useHistory, Redirect, Link } from "react-router-dom";

import { ProgressBar } from "react-bootstrap";

import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const PropsArray = [
    {id: 1, image: toAbsoluteUrl("/media/media/bahasa.jpg"), title: "Bahasa Indonesia", description: "Berisikan Materi Pelajaran Bahasa Indonesia", progressBar: "60%"},
    {id: 2, image: toAbsoluteUrl("/media/media/matematika.jpg"), title: "Matematika", description: "Berisikan Materi Pelajaran Matematika", progressBar: "30%"},
    {id: 3,image: toAbsoluteUrl("/media/media/fisika.jpg"), title: "Fisika", description: "Berisikan Materi Pelajaran Fisika", progressBar: "40%"},
    {id: 4,image: toAbsoluteUrl("/media/media/biologi.jpeg"), title: "Biologi", description: "Berisikan Materi Pelajaran Biologi", progressBar: "80%"},
    {id: 5,image: toAbsoluteUrl("/media/media/kimia.jpg"), title: "Kimia", description: "Berisikan Materi Pelajaran Kimia", progressBar: "20%"},
    {id: 6,image: toAbsoluteUrl("/media/media/english.jpg"), title: "Bahasa Inggris", description: "Berisikan Materi Pelajaran Bahasa Inggris", progressBar: "0%"}
]

const BankModuleSubs = ({props}) => {
  const classes = useStyles();

  const history = useHistory()

  const redirectTo = e => {
        console.info(e)
        return(
            <Redirect
                to={{
                 pathname: `/bank/${e}`
                }}
            />
        )
  }

  return (
    <div className="container">
        <div className="row">
        {PropsArray.map((v, i) => {
            const {id, image, title, description, progressBar} = v
            return(
            <div key={i} className="col-md-4 col-sm-12" style={{marginTop: 2 + 'em'}}>
                <Card className={classes.root}>
                    <Link 
                        to={`/bank/${id}`}>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'center'}}>
                        {title}
                        </Typography>
                        <hr />
                        <p>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                        </p>
                    </CardContent>
                    </Link>
                    <CardActions style={{float: 'right'}}>
                    <Button size="small" color="primary" onClick={() => redirectTo(v.id)}>
                        Pelajari
                    </Button>
                    </CardActions>
                </Card>
            </div>
            )
        })}
        </div>
    </div>
  );
}

export default BankModuleSubs