import React,{useEffect, useState, useRef} from "react";
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

//services
import { getCity, getProvince } from "../../../modules/Common/_redux/provinceCrud";
import { registerModules } from "../../../modules/Module/_redux/moduleCrud";

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

const RegistrationForm = ({title}) => {

    const _title = title;

    const classes = useStyles();

    const [propForm, setForm] = useState({
        schoolName: '',
        provinsiId: 0,
        provinsiName: '',
        kabupatenId: 0,
        kabupatenName: '',
        tryoutScheduleCode: _title
    })

    const [propProvince, setProvince] = useState([])
    const [propCity, setCity] = useState([])

    const [propAlert, setAlert] = useState(false)

    useEffect(() => {
        getProvince().then(res => {
            setProvince(res.data.data)
        })
    },[])

    const handleProvinceChange = ev => {
        const _value = ev.target.value

        getCity(_value).then(res => {
            setCity(res.data.data)
        })

        setForm({...propForm, provinsiId: _value, provinsiName: ev.nativeEvent.target.innerText, tryoutScheduleCode: _title})
    }

    const handleClick = () => {
        registerModules(propForm.schoolName, propForm.provinsiId, propForm.provinsiName, propForm.kabupatenId, propForm.kabupatenName, propForm.tryoutScheduleCode)
            .then(res => {
                if(res){
                    setAlert(true)
                }
            })

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
        <Grid container>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
                <FormControl style={{width: 80 + '%', float: 'right'}} variant="outlined" className={classes.formControl}>
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
        </Grid>
        <TextField
            id="outlined-multiline-static"
            label="Asal Selolah"
            multiline
            rows="4"
            defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={ev => setForm({...propForm, schoolName: ev.target.value})}
        />
        <Button onClick={() => handleClick()} variant="contained" color="secondary" style={{float: 'right', marginTop: 2 + 'em', marginBottom: 2 + 'em', height: 40 + 'px'}}>
            Checkout
        </Button>

        <SweetAlert success title="Registrasi Berhasil!" show={propAlert} onConfirm={() => setAlert(false)} onCancel={() => setAlert(false)}>
          Registrasi Berhasil, Anda dapat login ke dalam sistem
        </SweetAlert>
    </form>
    </>)
}

export default RegistrationForm