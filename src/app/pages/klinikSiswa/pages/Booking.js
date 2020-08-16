import React from "react";
import { FacultyCardComponent } from "./components/index";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers";


const optionBookingFilter = [
    {id: 1, module: "Matematika",name: 'Fadhil Muhammad', status: 0, image: 'harry.jpg', description: 'Lulusan Terbaik Universitas Indondesia Tahun 2010', rating: 3.4, schedule: ['Senin, 11 November 2020 20:00','Selasa, 12 November 18:00']},
    {id: 2, module: "Bahasa Inggris",name: 'M. Cholis Malik', status: 1,image: 'zayn.jpg', description: 'Mahasiswi Harvard yang sedang liburan', rating: 4.4,schedule: ['Senin, 11 November 2020 20:00','Selasa, 12 November 18:00']},
    {id: 3, module: "Kimia",name: 'Mikhael Hermanus', status: 1,image: 'james.jpg', description: 'Memiliki penghargaan tertinggi dari presiden', rating: 5 ,schedule: ['Senin, 11 November 2020 20:00','Selasa, 12 November 18:00']},
    {id: 4, module: "Fisika",name: 'Mahfudin Ade', status: 0,image: 'louis.jpg', description: 'Single Fighter hebat yang jago matematika', rating: 2.1, schedule: ['Senin, 11 November 2020 20:00','Selasa, 12 November 18:00']}
]

const Booking = ({props}) => {
    return(<div className="container">
        <form className="form-horizontal">
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="schedule" className="col-md-8 control-label">Filter By Jurusan</label>
                    <div className="col-md-8">
                        <select className="form-control">
                            <option>Matematika</option>
                            <option>Fisika</option>
                            <option>Kimia</option>
                            <option>Bahasa Indonesia</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="availablity" className="col-md-8 control-label">Filter By Star Quality</label>
                    <div className="col-md-8">
                        <select name="availablity" id="availablity" className="form-control">
                            <option>5 Star</option>
                            <option>4 Star</option>
                            <option>3 Star</option>
                            <option>2 Star</option>
                            <option>1 Star</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="name" className="col-md-8 control-label">Filter By Name</label>
                    <div className="col-md-8">
                        <input name="name" id="name" type="text" className="form-control" />
                    </div>
                </div>
            </div>
        </form>
        <div className="row">
            {optionBookingFilter.map((v, i) => {
                const {name, module,image, id, description, rating, status,schedule} = v
                return(<FacultyCardComponent module={module} status={status} id={id} schedule={schedule} rating={rating} description={description} name={name} image={toAbsoluteUrl(`/media/faculty/${image}`)}  />)
            })}
        </div>
    </div>)
}

export default Booking