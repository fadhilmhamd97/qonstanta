import React from "react";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers/AssetsHelpers";

const HistoryComponent = ({props}) => {
  return (
      <div className={`card card-custom card-stretch gutter-b`}>
        {/* Head */}
        <div className="card-header border-0 py-5">
        </div>
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <div className="table-responsive">
              <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{minWidth: "250px"}}><span className="text-dark-75">Mata Pelajaran</span></th>
                  <th style={{minWidth: "100px"}}>Guru Bimbel</th>
                  <th style={{minWidth: "100px"}}>Kelas</th>
                  <th style={{minWidth: "100px"}}>Jadwal</th>
                  <th style={{minWidth: "130px"}}>Aksi</th>
                </tr>
                </thead>
                <tbody>
                {props.map((v, i) => {
                    const {title, icon, classRoom, faculty, modules, schedule, status} = v
                    return(<tr key={i}>
                        <td className="pl-0 py-8">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-50 symbol-light mr-4">
                                <span className="symbol-label">
                                  <span className="svg-icon h-75 align-self-end">
                                    <img src={toAbsoluteUrl(`/media/svg/edulive/${icon}`)} style={{maxWidth: 40 + 'px'}} alt={`icon-${i}`} />
                                  </span>
                                </span>
                            </div>
                            <div>
                            <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">
                            {modules}</a>
                                <span className="text-muted font-weight-bold d-block">{title}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                              {faculty}
                            </span>
                        </td>
                        <td>
                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                            {classRoom}
                            </span>
                        </td>
                        <td>
                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                              {schedule}
                            </span>
                        </td>
                        <td className="pr-0 text-right">
                          <a href="#" className="btn btn-light-success font-weight-bolder font-size-sm">Lihat Detail</a>
                        </td>
                      </tr>
                      )
                })}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default HistoryComponent