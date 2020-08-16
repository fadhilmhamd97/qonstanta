import React,{useEffect, useState} from "react";
import { getModules } from "../../../modules/Module/_redux/moduleCrud";

import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import JadwalCardComponent from "./JadwalCard";
import { Row, Col } from "react-bootstrap";

const JadwalListComponent = ({ onChoose }) => {

  const [propModules, setModules] = useState([]);

  useEffect(() => {
        getModules().then(res => {
            let _p = [];
            res.data.data.map((v, i) => {
                if(v.code === 'TOPA-SIMAKUI-SMA-IPA-3'){
                  _p.push({
                    title: 'IPA',
                    limit: v.freeLimit,
                    name: v.name,
                    code: v.code
                  })
                }
                if(v.code === 'TOPA-SIMAKUI-SMA-IPS-3'){
                  _p.push({
                    title: 'IPS',
                    limit: v.freeLimit,
                    name: v.name,
                    code: v.code
                  })
                }
            })
            setModules([..._p]);
        })
  },[])

  const tempImage = [
    toAbsoluteUrl("/media/demos/ujian-ipa.jpg"),
    toAbsoluteUrl("/media/demos/ujian-ips.jpg")
  ]

  return(<>
      <Row>
        {propModules.map((v, i) => {
            return(
              <Col xs={12} md={4}>
                  <>
                    <JadwalCardComponent id={v.code} moduleChoose={onChoose} key={i} name={v.name} title={v.title} code={v.code} limit={v.limit} image={tempImage[i]} />
                  </>
              </Col>)
        })}
      </Row>
  </>)
}

export default JadwalListComponent