import React from "react";

import { InfoCardComponent, PieChartComponent, LineChartComponent } from "./component/index"
import { DashboardData } from "./_data";

const AdminDashboard = ({props}) => {
  return (<>
      <div className="row">
        {DashboardData.infoCards.map((v, i) => {
           return(<div className="col-md-4 col-sm-6">
             <InfoCardComponent key={i} description={v['description']} icon={v['icon']} totalRows={v['totalRows']}  />
            </div>)
        })}
      </div>
      <div className="row" style={{margin: '1em'}}>
        <div className="col-md-6 col-sm-12">
          <PieChartComponent title="Siswa Berdasarkan Paket" dataset={DashboardData.pieDatasetByPackage} />
        </div>
        <div className="col-md-6 col-sm-12">
          <PieChartComponent title="Siswa Berdasarkan Jurusan" dataset={DashboardData.pieDatasetByStudent} />
        </div>
      </div>
      <div className="row" style={{margin: '1em'}}>
        <div className="col-md-12">
            <LineChartComponent title="Statistik Pendaftaran Paket dalam Setahun" dataset={DashboardData.lineDatasetByYear} />
        </div>
      </div>
      <div className="row" style={{margin: '1em'}}>
        <div className="col-md-12">
            <LineChartComponent title="Statistik Pendaftaran Try Out dalam Setahun" dataset={DashboardData.lineDatasetByYear} />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard