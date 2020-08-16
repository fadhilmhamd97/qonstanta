import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { Badge } from "react-bootstrap";

import { Link } from "react-router-dom"

import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const FacultyCardComponent = ({name, image, id, description, rating, schedule, status, module}) => {

    const classes = useStyles()
    return(<div className="col-md-4 col-sm-12" style={{marginTop: 2 + 'em'}}>
    <Card className={classes.root}>
        <Link 
            to={`/klinik-siswa/book/${id}`}>
        <CardMedia
            className={classes.media}
            image={image}
            title="Contemplative Reptile"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2" style={{textAlign: 'center'}}>
            {name}
            <p>
                {status === 0 ? <Badge style={{fontSize: '8px'}} variant="danger">Tidak Tersedia</Badge> : <Badge style={{fontSize: '8px'}} variant="primary">Tersedia</Badge>}
            </p>
            </Typography>
            <hr />
            <p>
            <Typography variant="h6" color="textSecondary" gutterBottom>
                {module}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {description}
            </Typography>
            </p>
            <Typography variant="body2" color="textSecondary" component="p" display="block" gutterBottom>
                Kuota: 14/40
            </Typography>
            <div classNames="row">
            <p></p>
            {schedule.map((v, i) => {
                return(<div classNames="col-md-4">
                    <Typography variant="caption" color="textSecondary" component="p" display="block" gutterBottom>
                        {v}
                    </Typography>
                </div>)
            })}
            </div>

        <Typography style={{textAlign: 'right'}} variant="body2" component="p" display="block" gutterBottom>
            Rating: <StarIcon /> {rating}
        </Typography>
        </CardContent>
        </Link>
        <CardActions style={{float: 'right'}}>
        <Button size="small" color="primary">
            Buat Janji
        </Button>
        </CardActions>
    </Card>
</div>)
}

export default FacultyCardComponent