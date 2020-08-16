import React,{useEffect, useState} from "react";
import { Button, Badge } from "react-bootstrap";
import { BootstrapCard } from "../../../../shared/common/index";


const BankNavigation = ({items, onClick, currentActive}) => {

    const [propNav, setNav] = useState([])

    const data = () => {
        let i = []
        while(true){
            if(i.length === 40) break;

            i.push({id: i.length + 1})
        }
        setNav(i)
    }

    useEffect(() => {
        data()
    },[])

    return(<>
    <div className="container">
        <div className="row" style={{textAlign: 'center', color: 'white', margin: 'auto'}}>
            {propNav.map(v =>{
                return(<div style={{margin: 8 + 'px', cursor:'pointer', backgroundColor: 'red', width: 32 + 'px', height: 27 + 'px'}} key={v.id} className="col-xs-10">
                    {v.id}
                </div>)
            })}
        </div></div></>)
}

export default BankNavigation