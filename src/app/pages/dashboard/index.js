import React from "react";
import { JadwalList } from "./component/JadwalList";
import { useDispatch } from "react-redux";
import * as action from "../../modules/Registration/_redux/registrationAction";

export function DashboardPage() {

  const dispatch = useDispatch()

  const handleChoose = ({name, code}) => {
      dispatch(action.subscribeRegistration({name, code}))
  }

  return(<>
    <div className="row">
        <div className="col-lg-12 col-xxl-12">
            <JadwalList onChoose={handleChoose} className="card-stretch gutter-b"/>
        </div>
    </div>
    </>);
}
