import React from "react"
import Typography from '@material-ui/core/Typography'
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers/AssetsHelpers"
import { BootstrapCard } from "../../../../shared/common/index"
import StarIcon from '@material-ui/icons/Star'

const FacultyDiscussionComponent = ({props}) => {
    return(
    <BootstrapCard
        noFooter={true}
        >
        <div>
            <div className="row">
                <div className="col-md-2 col-sm-4" style={{textAlign: 'center'}}>
                    <img style={{maxWidth: 80 + 'px'}} src={toAbsoluteUrl(`/media/people/rinaldi.png`)} width="100%" alt={`rinaldi-photo`} />
                </div>
                <div className="col-md-9 col-sm-8">
                <Typography variant="body1" gutterBottom>
                    Rinaldi Anwar
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <i style={{fontSize: '10px'}}>Founder of Qonstanta</i>
                </Typography>
                <hr />
                <Typography variant="body2" gutterBottom>
                    Orangnya ramah dan baik sehingga pelajaran akan sangat mudah untuk dimengerti
                </Typography>
                <p style={{textAlign: 'right'}}>
                    5.5 <StarIcon />
                </p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2 col-sm-4" style={{textAlign: 'center'}}>
                    <img style={{maxWidth: 80 + 'px'}} src={toAbsoluteUrl(`/media/people/nana.png`)} width="100%" alt={`rinaldi-photo`} />
                </div>
                <div className="col-md-9 col-sm-8">
                <Typography variant="body1" gutterBottom>
                    Nana Rangga Permana
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <i style={{fontSize: '10px'}}>CTO of Qonstanta</i>
                </Typography>
                <hr />
                <Typography variant="body2" gutterBottom>
                    Orangnya necis, keren dan berbakat
                </Typography>
                <p style={{textAlign: 'right'}}>
                    5.0 <StarIcon />
                </p>
                </div>
            </div>
        </div>
    </BootstrapCard>
    )
}

export default FacultyDiscussionComponent