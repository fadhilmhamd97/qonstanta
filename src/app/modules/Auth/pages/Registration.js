import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";
import SweetAlert from "react-bootstrap-sweetalert";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const initialValues = {
  fullName: "",
  nickName: "",
  email: "",
  password: "",
  phoneNumber: undefined,
  birthDate: undefined,
  birthPlace: "",
  schoolOrigin: "",
  changepassword: "",
  acceptTerms: false,
};

function Registration(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    nickName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    phoneNumber: Yup.number()
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
    birthDate: Yup.date()
        .required(
          intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED_FIELD"
          })
        ),
    birthPlace: Yup.string()
        .required(
          intl.formatMessage({
            id: "AUTH.VALIDATION.REQUIRED_FIELD"
          })
        ),
    schoolOrigin: Yup.string()
          .required(
            intl.formatMessage({
              id: "AUTH.VALIDATION.REQUIRED_FIELD"
            })
          ),
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
    acceptTerms: Yup.bool().required(
      "You must accept the terms and conditions"
    ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const [propSuccessAlert, setSuccessAlert] = useState(false);

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const redirectToLogin = () => {
    props.history.push('/auth/login')
  }

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      var _data = {
        email: values.email,
        fullName: values.fullName,
        nickName: values.nickName,
        phoneNumber: values.phoneNumber,
        birthDate: values.birthDate,
        birthPlace: values.birthPlace,
        schoolOriginText: values.schoolOrigin
      }
      register(_data)
        .then(({ data: { accessToken } }) => {
          props.register(accessToken);
          setSuccessAlert(true);
          disableLoading();
        })
        .catch(err => {
          setSubmitting(false);
          setStatus(err.response.data.message);
          disableLoading();
        });
    },
  });

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Silahkan isi form data diri anda
        </p>
      </div>

      <SweetAlert success title="Registrasi Berhasil!" show={propSuccessAlert} onConfirm={redirectToLogin} onCancel={() => setSuccessAlert(false)}>
          Registrasi Berhasil, Cek email kamu untuk melakukan aktivasi akun
      </SweetAlert>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: Fullname */}
        <div className="form-group fv-plugins-icon-container">
          <label class="control-label">Nama Lengkap</label>
          <input
            placeholder="Full name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "fullName"
            )}`}
            name="fullName"
            {...formik.getFieldProps("fullName")}
          />
          {formik.touched.fullname && formik.errors.fullname ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.fullname}</div>
            </div>
          ) : null}
        </div>
        {/* end: Fullname */}

        {/* begin: Nickname */}
        <div className="form-group fv-plugins-icon-container">
          <label class="control-label">Nama Panggilan</label>
          <input
            placeholder="Nick name"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "nickName"
            )}`}
            name="nickName"
            {...formik.getFieldProps("nickName")}
          />
          {formik.touched.nickName && formik.errors.nickName ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.nickName}</div>
            </div>
          ) : null}
        </div>
        {/* end: Nickname */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <label class="control-label">Email</label>
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
        {/* end: Email */}

          {/* begin: Phone Number */}
        <div className="form-group fv-plugins-icon-container">
          <label class="control-label">No Handphone</label>
          <input
            placeholder="Phone Number"
            type="number"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "phoneNumber"
            )}`}
            name="phoneNumber"
            {...formik.getFieldProps("phoneNumber")}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.phoneNumber}</div>
            </div>
          ) : null}
        </div>
        {/* end: Phone Number*/}

        {/* begin: Birth Date */}
        <div className="form-group fv-plugins-icon-container">
          <div className="row">
            <div className="col-md-6">
              <label class="control-label">Tempat Lahir</label>
              <input
                placeholder="Tempat"
                type="text"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "birthPlace"
                )}`}
                name="birthPlace"
                {...formik.getFieldProps("birthPlace")}
              />
              {formik.touched.phoneNumber && formik.errors.birthPlace ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.birthPlace}</div>
                </div>
              ) : null}
            </div>
            <div className="col-md-6">
              <label class="control-label">Tanggal Lahir</label>
              <input
                type="date"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "birthDate"
                )}`}
                name="birthDate"
                {...formik.getFieldProps("birthDate")}
              />
              {formik.touched.birthDate && formik.errors.birthDate ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.birthDate}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/* end: Birth Date*/}

        {/* begin: Asal Sekolah */}
        <div className="form-group fv-plugins-icon-container">
        <label class="control-label">Asal Sekolah</label>
          <input
            placeholder="Asal Sekolah"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "schoolOrigin"
            )}`}
            name="schoolOrigin"
            {...formik.getFieldProps("schoolOrigin")}
          />
          {formik.touched.schoolOrigin && formik.errors.schoolOrigin ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.schoolOrigin}</div>
            </div>
          ) : null}
        </div>
        {/* end: Asal Sekolah */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
        <label class="control-label">Password</label>
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
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <label class="control-label">Ketik password ulang</label>
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "changepassword"
            )}`}
            name="changepassword"
            {...formik.getFieldProps("changepassword")}
          />
          {formik.touched.changepassword && formik.errors.changepassword ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.changepassword}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

        {/* begin: Terms and Conditions */}
        <div className="form-group">
          <label className="checkbox">
            <input
              type="checkbox"
              name="acceptTerms"
              className="m-1"
              {...formik.getFieldProps("acceptTerms")}
            />
            <Link to="/terms" target="_blank" className="mr-1" rel="noopener noreferrer">
            I agree the Terms & Conditions
            </Link>
            <span />
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.acceptTerms}</div>
            </div>
          ) : null}
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.values.acceptTerms}
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span>Submit</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
