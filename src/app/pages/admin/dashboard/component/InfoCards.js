/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect} from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../../_metronic/_helpers/AssetsHelpers"

import GroupIcon from '@material-ui/icons/Group'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import EditIcon from '@material-ui/icons/Edit'

const IconChoice = ({icon}) => {
    return(<>
        {icon === 'users' ?? <GroupIcon />}
        {icon === 'user' ?? <PersonAddIcon />}
        {icon === 'exam' ?? <EditIcon />}
    </>)
}

const InfoCardComponent = ({ icon, totalRows, description }) => {

  useEffect(() => {
  }, []);

  return (
    <div className={`card card-custom card-stretch card-stretch-half gutter-b`} style={{height: '140px'}}>
      <div className="card-body d-flex flex-column p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
          <span className="symbol symbol-circle symbol-50 symbol-light-primary mr-2">
            <span className="symbol-label">
              <IconChoice icon={icon} />
            </span>
          </span>
          <div className="d-flex flex-column text-right">
            <span className="text-dark-75 font-weight-bolder font-size-h3">
              {totalRows}
            </span>
            <span className="text-muted font-weight-bold mt-2">{description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCardComponent