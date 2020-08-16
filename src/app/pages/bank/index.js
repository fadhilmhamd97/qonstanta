import React,{useState} from "react";
import { BootstrapCard } from "../../shared/common/index";
import { toAbsoluteUrl } from "../../../_metronic/_helpers/AssetsHelpers";
import Typography from '@material-ui/core/Typography';
import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";


const semesterContext1 = [
  {title: 'Introduction to Laravel', image: '1.png', description: 'How you know first, about Laravel', modules: 40},
  {title: 'Basic Concepts of Laravel Fundamentals', image: '2.png', description: 'Learn to know the concepts behind powerful framework', modules: 20},
  {title: 'Composer', image: '3.png', description: 'Laravel powerful CLI to manage your projects', modules: 30},
  {title: 'MVC Design Pattern', image: '4.png', description: 'Basic Fundamentals of core concepts Laravel Framework', modules: 10},
  {title: 'Eloquent, Models, Relations', image: '5.png', description: 'Learn to advanced your knowledge behind Laravel ORM Core', modules: 40},
  {title: 'Controller Principle', image: '6.png', description: 'Learn the secret of Laravel Controller', modules: 80},
  {title: 'Blade Template Engine', image: '7.png', description: 'Learn the great template engine Laravel', modules: 5},
  {title: 'Advanced Concept Laravel', image: '7.png', description: 'Deep the concept of design pattern in Laravel', modules: 11}  
]


const Bank = ({props}) => {
    return(<>
        <div className="row">
            {semesterContext1.map((v, i) => {
                const {title, image, description, modules} = v
                return(
                    <BootstrapCard
                        headerStyle={{fontSize: 17 + 'px', backgroundColor: '#3699ff', color: 'white'}}
                        style={{width: 100 + '%', margin: 12 + 'px'}}
                        header={title}
                        noFooter={true}
                        >
                        <Link to="/bank/module?subjects=1&module=4">
                            <div className="row" style={{cursor: 'pointer'}}>
                                <div className="col-md-3 col-sm-4" style={{textAlign: 'center'}}>
                                    <img style={{maxWidth: 80 + 'px'}} src={toAbsoluteUrl(`/media/svg/bank-icon/${image}`)} width="100%" alt={`img-${i}`} />
                                </div>
                                <div className="col-md-9 col-sm-8">
                                    <Typography variant="body1" gutterBottom>
                                        {description}
                                        <p style={{color: 'red', fontStyle:'italic'}}>Klik untuk memilih</p>
                                    </Typography>
                                    <Button style={{float: 'right', top: 10 + '%', position: 'relative'}} variant="primary">
                                            Jumlah Module <Badge variant="light">{modules}</Badge>
                                        <span className="sr-only">unread messages</span>
                                    </Button>
                                </div>
                            </div>   
                        </Link>
                    </BootstrapCard>)
            })}
        </div>
    </>)
}

export default Bank