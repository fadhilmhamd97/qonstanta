import React from "react";

import { InfoCardComponent, PieByPackageComponent } from "./component/index";

const infoCards = [
  {icon: 'users', totalRows: '41K', description: 'Member Terdaftar'},
  {icon: 'user', totalRows: '35K', description: 'Pendaftar'},
  {icon: 'exam', totalRows: '200', description: 'Pendaftar Try Out'}
]

const datasetPie = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
  }]
}

const AdminDashboard = ({props}) => {
  return (<>
      <div className="row">
        {infoCards.map((v, i) => {
           return(<div className="col-md-4 col-sm-6">
             <InfoCardComponent key={i} description={v['description']} icon={v['icon']} totalRows={v['totalRows']}  />
            </div>)
        })}
      </div>
      <div className="row">
        {/* <PieByPackageComponent dataset={datasetPie} /> */}
      </div>
    </>
  );
}

export default AdminDashboard