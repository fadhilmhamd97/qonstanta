import React from "react";
import { Dropdown } from "react-bootstrap";

const TimelineBadge = ({module, schedule}) => {
    return(<div className="timeline-item align-items-start" style={{position: 'relative', left: '-15%'}}>
    <div style={{position: 'relative', right: 7 + '%'}} className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
      {module}
    </div>

    <div className="timeline-badge" style={{position: 'relative', left: 15 + '%'}}>
      <i className="fa fa-genderless text-warning icon-xl" style={{position: 'relative', left: 15 + '%'}}></i>
    </div>

    <div style={{position: 'relative', left: 15 + '%'}} className="font-weight-mormal font-size-lg timeline-content text-muted pl-3">
      {schedule}
    </div>
  </div>)
}

const ScheduleDetailComponent = ({context,datasets}) => {

    return(<div className="timeline timeline-5">
    {datasets.map((v, i) => {
        return(<>
          <TimelineBadge module={v.name} schedule={v.datetimeStart}></TimelineBadge>
        </>
        )
    })}
</div>)
}

export default ScheduleDetailComponent