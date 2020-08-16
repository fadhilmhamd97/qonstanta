import React,{useEffect, useState} from "react";
import clsx from "clsx";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SweetAlert from "react-bootstrap-sweetalert";
import {
    Modal,
    ButtonToolbar,
    Col,
    Container,
    Row
  } from "react-bootstrap";
  import ScheduleDetailComponent from "./ScheduleDetail";

//services
import { getCity, getProvince } from "../../../modules/Common/_redux/provinceCrud";
import { registerModules, getScheduleByid } from "../../../modules/Module/_redux/moduleCrud";

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

const RegistrationForm = ({title, props, packet, packetDescription}) => {

    const _title = title;

    const classes = useStyles();

    const [propForm, setForm] = useState({
        schoolName: '',
        provinsiId: 0,
        provinsiName: '',
        kabupatenId: 0,
        kabupatenName: '',
        tryoutScheduleCode: ''
    })

    const [propProvince, setProvince] = useState([])
    const [propCity, setCity] = useState([])
    const [propSchedule, setSchedule] = useState([])

    const [propAlert, setAlert] = useState(false)

    useEffect(() => {
        getProvince().then(res => {
            setProvince(res.data.data)
        })
        getScheduleByid(window.location.href.split('/')[window.location.href.split('/').length - 1]).then(res => {
            setSchedule(res.data.data)
        })
    },[])

    const handleProvinceChange = ev => {
        const _value = ev.target.value

        getCity(_value).then(res => {
            setCity(res.data.data)
        })

        setForm({...propForm, provinsiId: _value, provinsiName: ev.nativeEvent.target.innerText})
    }

    const handleClick = () => {
        registerModules(propForm.schoolName, propForm.provinsiId, propForm.provinsiName, propForm.kabupatenId, propForm.kabupatenName, propForm.tryoutScheduleCode)
            .then(res => {
                if(res){
                    setAlert(true)
                }
            }).catch(err => {
                const error = `${err.message}`;
                if(error.includes('status code 409')){
                    alert('Kamu sudah mendaftar tryout ini, silahkan pilih Tryout lain')
                    props.history.push('/dashboard')
                }
            })

    }


    const redirectToList = () => {
        props.history.push('/dashboard')
    }

    const [propDetail, setDetail] = useState([])

    const handleDetailOverview = (ev) => {
        const _value = ev.target.value

        let data = []

        propSchedule.forEach(v => {
            if(v.code === _value)
                data = v.tryoutScheduleDetail
        })

        console.info(data)

        //check array
        setDetail([...data]);
        setForm({...propForm, tryoutScheduleCode: ev.target.value})
    }

    const [propDetailShow, setDetailShow] = useState(false);

    const JadwalComponent = ({detail, show}) => {
        return(<Modal
            
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{margin: 'auto'}}>
                <ScheduleDetailComponent datasets={detail} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setDetailShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>)
    }

    return(
    <>
    <form noValidate autoComplete="off">
        <TextField
            id="kode-paket"
            label="Kode Paket"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            disabled
            value={_title}
        />
        <FormControl variant="outlined" style={{width: 80 + '%'}} className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-simple">
                --Pilih Jadwal--
            </InputLabel>
            <Select
            input={<OutlinedInput name="age" id="outlined-age-simple"
            onChange={value => handleDetailOverview(value)}
            />}
            >
                {propSchedule.map((v, i) => {
                    return(<MenuItem key={i} value={v.code}>
                    <em>{v.code} | {v.name}</em>
                </MenuItem>)
                })}
            </Select>
        </FormControl>
        <Grid container>
            <Grid item xs={12} md={6}>
                <FormControl style={{width: 80 + '%'}} variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-simple">
                        Provinsi
                    </InputLabel>
                    <Select
                    input={<OutlinedInput name="age" id="outlined-age-simple" />}
                    onChange={value => handleProvinceChange(value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {propProvince.map((v, i) => {
                            return(<MenuItem key={i} value={v.id}>{v.nama}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" style={{width: 80 + '%'}} className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-simple">
                        Kabupaten
                    </InputLabel>
                    <Select
                    input={<OutlinedInput name="age" id="outlined-age-simple"
                    onChange={ev => setForm({...propForm, kabupatenId: ev.target.value, kabupatenName: ev.nativeEvent.target.innerText})}
                    />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {propCity.map((v, i) => {
                            return(<MenuItem key={i} value={v.id}>
                            <em>{v.nama}</em>
                        </MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <TextField
            id="outlined-multiline-static"
            label="Asal Selolah"
            multiline
            rows="4"
            defaultValue=""
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={ev => setForm({...propForm, schoolName: ev.target.value})}
        />
        <div style={{float: 'right'}}>
            <Grid container>
                <Grid style={{padding: .5 + 'em'}} item={4}>
                <Button style={{margin: 1 + 'em',height: 40 + 'px'}} color="primary" onClick={() => setDetailShow(true)} variant="contained">
                    Lihat Jadwal
                </Button>
                </Grid>
                <Grid style={{padding: .5 + 'em'}} item={4}>
                <Button variant="contained" color="secondary" style={{margin: 1 + 'em',height: 40 + 'px'}} onClick={() => handleClick()}>
                    Checkout
                </Button>
                </Grid>
            </Grid>
        </div>

        <SweetAlert success title="Registrasi Berhasil!" show={propAlert} onConfirm={redirectToList} onCancel={() => setAlert(false)}>
            <span>Registrasi Berhasil, Selamat anda telah berhasil registrasi {packetDescription} </span>
            <p style={{fontSize: 11 + 'px', color: 'red'}}><b>({packet})</b></p>
            <p>Harap mengecek email untuk melanjutkan pembayaran</p>
        </SweetAlert>

        <JadwalComponent show={propDetailShow} detail={propDetail} />
    </form>
    </>)
}

export default RegistrationForm