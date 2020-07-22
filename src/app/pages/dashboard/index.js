import React from "react";
import { JadwalList } from "./component/JadwalList";

export function DashboardPage() {
  return(<>
    <div className="row">
        <div className="col-lg-12 col-xxl-12">
            <JadwalList className="card-stretch gutter-b"/>
        </div>
    </div>
    </>);
}
