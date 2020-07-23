import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login, forgotPassword } from "../_redux/authCrud";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { Modal, Form, Button } from "react-bootstrap";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const delegateForgotPassword = ev => {
    ev.preventDefault();
    setModalFlag(true)
    //Create Request
  }

  const changePasswordDelegate = value => {
    forgotPassword(value).then(res => {
      setAlert(true)
    },
    err=> {
      setDangerAlert(true)
    })
  }

  const [propModalFlag, setModalFlag] = useState(false)

  const [propAlert, setAlert] = useState(false)
  const [propDangerAlert, setDangerAlert] = useState(false)

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const JadwalComponent = ({modalGrabber, show, controlModal}) => {

    const [propEmail, setEmail] = useState('')

    const handlerEvent = () => {
      modalGrabber(propEmail)
      controlModal()
    }

    return(<Modal
        
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Masukkan email kamu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={ev => setEmail(ev.target.value)} />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handlerEvent}>
            Submit
        </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={controlModal}>Close</Button>
        </Modal.Footer>
      </Modal>)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.email, values.password)
          .then(({data}) => {
            disableLoading();
            props.login({sessionToken: data.data.accessToken, email: values.email, userProps: data.data.user});
            localStorage.setItem('userProps',values.email)
          })
          .catch(err => {
            disableLoading();
            setSubmitting(false);
            const error = err.response ? err.response.data.message : "Terjadi kesalahan saat mencoba masuk"
            setStatus(error);
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          <FormattedMessage id="AUTH.LOGIN.DESCRIPTION" />
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <Link
            to="#"
            onClick={ev => delegateForgotPassword(ev)}
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            Lupa Password
          </Link>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center" style={{float: 'right'}}>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Masuk</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
      <SweetAlert success title="Lupa Password Berhasil!" show={propAlert} onConfirm={() => setAlert(false)} onCancel={() => setAlert(false)}>
        Silahkan cek akun email kamu untuk mereset password
      </SweetAlert>

      <SweetAlert success title="Lupa Password Berhasil!" show={propDangerAlert} onConfirm={() => setDangerAlert(false)} onCancel={() => setDangerAlert(false)}>
        Terjadi kesalahan saat mengubah password
      </SweetAlert>

      <JadwalComponent modalGrabber={changePasswordDelegate} show={propModalFlag} controlModal={() => setModalFlag(false)}  />
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
