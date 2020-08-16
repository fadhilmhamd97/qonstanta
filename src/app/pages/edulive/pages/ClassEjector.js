import React,{useState, useEffect} from "react"
import { Button } from "react-bootstrap"
import { toAbsoluteUrl } from "../../../../_metronic/_helpers/AssetsHelpers"
import Typography from '@material-ui/core/Typography'
import { useLocation } from "react-router-dom";

const ClassEjector = ({props}) => {

    const search = useLocation().search

    const [propUrlParam, setUrlParam] = useState('')

    useEffect(() => {
        const name = new URLSearchParams(search).get('class')
        setUrlParam(name)
    },[])

    return(<div className="container" style={{textAlign: 'center'}}>
        <img src={toAbsoluteUrl("/media/media/gambar-profil.svg")} style={{maxWidth: 420 + 'px'}} alt="EjectorImage" />
        <Typography variant="h4" gutterBottom style={{marginTop: 1 + 'em'}}>
            Anda akan memasuki kelas
                <b style={{margin: 12 + 'px'}}>{propUrlParam}</b>
        </Typography>
        <p>Klik tombol untuk melanjutkan</p>
        <Button>
            Masuk
        </Button>
    </div>)
}

export default ClassEjector