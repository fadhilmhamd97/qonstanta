import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Typography from '@material-ui/core/Typography';

import { ScheduleComponent, HistoryComponent } from "./component/index";

const TabContainer = ({children}) => {
    return(<Typography component="div" style={{ padding: 8 * 3 }}>
    {children}
  </Typography>)
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 1240 + 'px'
    },
}));

const schedules = [
    {title: 'Reproduksi pada manusia', modules: 'Biologi', icon: 'biology.png', faculty: 'Mr. Jalu sehat', schedule: 'Senin, 28 Oktober 2020 | 08:00 - 09:00', status: 1, classRoom: 'FN1234'},
    {title: 'Integral dan Fungsi', modules: 'Matematika', icon: 'math.png', faculty: 'Davine Kowalski M.Kom', schedule: 'Rabu, 31 Oktober 2020 | 08:00 - 09:00', status: 0, classRoom: 'FN1235'},
    {title: 'Kalor', modules: 'Fisika', icon: 'physic.png', faculty: 'Srini Wulandari S.Pd', schedule: 'Jumat, 2 November 2020 | 08:00 - 09:00', status: 0, classRoom: 'FN1236'},
    {title: 'Larutan dan Zat', modules: 'Kimia', icon: 'chemical.png', faculty: 'Prof. Fadhil Muhammad', schedule: 'Sabtu, 3 November 2020 | 08:00 - 09:00', status: 0, classRoom: 'FN1237'},
    {title: 'Kalimat Formal dan Infomal', modules: 'Bahasa Indonesia', icon: 'bahasa.png', faculty: 'M.Cholis Malik M.Ag', schedule: 'Senin, 5 November 2020 | 08:00 - 09:00', status: 0, classRoom: 'FN1238'},
    {title: 'Past Tense', modules: 'Bahasa Inggris', icon: 'english.png', faculty: 'Mikhael Hermanus M.Pd', schedule: 'Jumat, 7 November 2020 | 08:00 - 09:00', status: 0, classRoom: 'FN1239'},
]

const EduLive = ({props}) => {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return(
    <div className="container">
    <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="Jadwal yang akan datang" icon={<DateRangeIcon />} />
            <Tab label="History Jadwal" icon={<ScheduleIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><ScheduleComponent props={schedules} /></TabContainer>}
        {value === 1 && <TabContainer><HistoryComponent props={schedules} /></TabContainer>}
      </div>
      </div>
    )
}

export default EduLive