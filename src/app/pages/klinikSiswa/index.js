import React from "react"
import { BootstrapCard } from "../../shared/common/index";
import { toAbsoluteUrl } from "../../../_metronic/_helpers/AssetsHelpers"
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const KlinikSiswa = ({props}) => {
    return(<div className="container">
        <div className="row">
            <div className="col-md-6 col-sm-12">
            <div className={`card card-custom card-stretch gutter-b`}>
                <div className="card-body d-flex flex-column p-0">
                    <div style={{ backgroundColor: '#3699FF'}} className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
                    <div className="d-flex flex-column mr-2">
                        <Link to="/klinik-siswa/book">
                        <Typography variant="h5" style={{color: 'white'}} gutterBottom className="text-hover-secondary font-weight-bolder font-size-h5">
                            Buat Janji
                        </Typography>
                        <span style={{color: '#ffeebf'}} className="font-weight-bold mt-2">
                            Pilih guru untuk membuat janji
                        </span>
                        </Link>
                    </div>
                    </div>
                    <div id="kt_stats_widget_7_chart" className="card-rounded-bottom" style={{ height: "180px", padding: "15px" }}>
                        <div class="row">
                            <div class="col-md-4 col-sm-12">
                                <img src={toAbsoluteUrl("/media/icons/janji.png")} style={{width: 100 + '%', marginLeft: 27 + 'px'}} alt="JanjiPng" />
                            </div>
                            <div class="col-md-8 col-sm-12" style={{padding: 2 + 'em'}}>
                            <Typography variant="h5" gutterBottom>
                                Jumlah Pengajar: 140
                            </Typography>
                                <p style={{lineHeight: 2}}>Pengajar tersedia: 24</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-md-6 col-sm-12">
            <div className={`card card-custom card-stretch gutter-b`}>
                <div className="card-body d-flex flex-column p-0">
                    <div style={{ backgroundColor: '#3699FF'}} className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
                    <div className="d-flex flex-column mr-2">
                        <Link to="/klinik-siswa/schedule">
                            <Typography variant="h5" style={{color: 'white'}} gutterBottom className="text-hover-secondary font-weight-bolder font-size-h5">
                                Pilih Jadwal
                            </Typography>
                            <span style={{color: '#ffeebf'}} className="font-weight-bold mt-2">
                                Jadwal Konsultasi
                            </span>
                        </Link>
                    </div>
                    </div>
                    <div id="kt_stats_widget_7_chart" className="card-rounded-bottom" style={{ height: "180px", padding: "15px" }}>
                        <div class="row">
                            <div class="col-md-4 col-sm-12">
                                <img src={toAbsoluteUrl("/media/icons/book.png")} style={{width: 100 + '%', marginLeft: 27 + 'px'}} alt="JanjiPng" />
                            </div>
                            <div class="col-md-8 col-sm-12" style={{padding: 2 + 'em'}}>
                            <Typography variant="h5" gutterBottom>
                                Jadwal Saat Ini: 3
                            </Typography>
                                <p style={{lineHeight: 2}}>Sisa Kuota Anda: 1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>)
}

export default KlinikSiswa