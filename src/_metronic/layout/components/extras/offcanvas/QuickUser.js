/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { useHistory } from "react-router-dom";
import {toAbsoluteUrl} from "../../../../_helpers";
import { Link } from "react-router-dom";
import { useSelect } from "downshift";
import { Row, Col } from "react-bootstrap";

export function QuickUser(props) {
  const history = useHistory();

  const logoutClick = () => {
      const toggle = document.getElementById("kt_quick_user_toggle");
      if (toggle) {
        toggle.click();
      }
      localStorage.clear();   
      history.push("/logout");
  };

  //state
  const [propsUser, setUser] = useState({})

  useEffect(() => {
    //read local storage for user email
    const {fullName, email, phone} = JSON.parse(localStorage.getItem('user'))
    console.info(localStorage.getItem('user'))
    setUser({fullName, email, phone})
  },[])


  return (
      <div id="kt_quick_user" className="offcanvas offcanvas-right offcanvas p-10">
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
          <h3 className="font-weight-bold m-0">
            User Profile
            <small className="text-muted font-size-sm ml-2"></small>
          </h3>
          <a
              href="#"
              className="btn btn-xs btn-icon btn-light btn-hover-primary"
              id="kt_quick_user_close"
          >
            <i className="ki ki-close icon-xs text-muted"/>
          </a>
        </div>

        <div
            className="offcanvas-content pr-5 mr-n5"
        >
          <div className="d-flex align-items-center mt-5">
            <div
                className="symbol symbol-100 mr-5"
            >
              <div className="symbol-label" style={{
                backgroundImage: `url(${toAbsoluteUrl(
                    "/media/users/default.jpg"
                )})`
              }}/>
              <i className="symbol-badge bg-success"/>
            </div>
            <div className="d-flex flex-column">
              <a
                  href="#"
                  className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
              >
                {}
              </a>
              <div className="text-muted mt-1"></div>
              <div className="navi mt-2">
                <a href="#" className="navi-item">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon-lg svg-icon-primary">
                      <SVG
                          src={toAbsoluteUrl(
                              "/media/svg/icons/General/User.svg"
                          )}
                      ></SVG>
                      
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary">
                      {propsUser.fullName}      
                  </span>
                </span>
                </a>
              </div>
              <div className="navi mt-2">
                <a href="#" className="navi-item">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon-lg svg-icon-primary">
                      <SVG
                          src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Mail-notification.svg"
                          )}
                      ></SVG>
                      
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary">
                      {propsUser.email}
                  </span>
                </span>
                </a>
              </div>
              <div className="navi mt-2">
                <a href="#" className="navi-item">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon-lg svg-icon-primary">
                      <SVG
                          src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Incoming-call.svg"
                          )}
                      ></SVG>
                      
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary">
                      {propsUser.phone}
                  </span>
                </span>
                </a>
              </div>
              {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
            </div>
          </div>
          <br />
          <Row>
                <Col xs={12} md={12} style={{textAlign:'center'}}>
                  <Link style={{width: 200 + 'px'}} to="/profile/change-password" className="btn btn-light-primary btn-bold">
                    Ganti Password
                  </Link>
                </Col>
                <br />
                <br />
                <Col xs={12} md={12} style={{textAlign: 'center'}}>
                  <button style={{width: 200 + 'px', marginTop: 1 +'em'}} className="btn btn-light-primary btn-bold" onClick={logoutClick}>Sign out</button>
                </Col>
          </Row>

          {/* <div className="separator separator-dashed mt-8 mb-5"/>

          <div className="navi navi-spacer-x-0 p-0">
            <a href="/user/profile" className="navi-item">
              <div className="navi-link">
                <div className="symbol symbol-40 bg-light mr-3">
                  <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-success">
                    <SVG
                        src={toAbsoluteUrl(
                            "/media/svg/icons/General/Notification2.svg"
                        )}
                    ></SVG>
                  </span>
                  </div>
                </div>
                <div className="navi-text">
                  <div className="font-weight-bold">My Profile</div>
                  <div className="text-muted">
                    Account settings and more
                    {" "}
                    <span className="label label-light-danger label-inline font-weight-bold">
                    update
                  </span>
                  </div>
                </div>
              </div>
            </a>

            <a href="/user/profile" className="navi-item">
              <div className="navi-link">
                <div className="symbol symbol-40 bg-light mr-3">
                  <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-warning">
                    <SVG
                        src={toAbsoluteUrl(
                            "/media/svg/icons/Shopping/Chart-bar1.svg"
                        )}
                    ></SVG>
                  </span>
                  </div>
                </div>
                <div className="navi-text">
                  <div className="font-weight-bold">My Messages</div>
                  <div className="text-muted">Inbox and tasks</div>
                </div>
              </div>
            </a>

            <a href="/user/profile" className="navi-item">
              <div className="navi-link">
                <div className="symbol symbol-40 bg-light mr-3">
                  <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG
                        src={toAbsoluteUrl(
                            "/media/svg/icons/Files/Selected-file.svg"
                        )}
                    ></SVG>
                  </span>
                  </div>
                </div>
                <div className="navi-text">
                  <div className="font-weight-bold">My Activities</div>
                  <div className="text-muted">Logs and notifications</div>
                </div>
              </div>
            </a>

            <a href="/user/profile" className="navi-item">
              <div className="navi-link">
                <div className="symbol symbol-40 bg-light mr-3">
                  <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG
                        src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Mail-opened.svg"
                        )}
                    ></SVG>
                  </span>
                  </div>
                </div>
                <div className="navi-text">
                  <div className="font-weight-bold">My Tasks</div>
                  <div className="text-muted">latest tasks and projects</div>
                </div>
              </div>
            </a>
          </div>

          <div className="separator separator-dashed my-7"></div> */}

          {/* <div>
            <h5 className="mb-5">Recent Notifications</h5>

            <div className="d-flex align-items-center bg-light-warning rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-warning mr-5">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
                  className="svg-icon svg-icon-lg"
              ></SVG>
            </span>

              <div className="d-flex flex-column flex-grow-1 mr-2">
                <a
                    href="#"
                    className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  Another purpose persuade
                </a>
                <span className="text-muted font-size-sm">Due in 2 Days</span>
              </div>

              <span className="font-weight-bolder text-warning py-1 font-size-lg">
              +28%
            </span>
            </div>

            <div className="d-flex align-items-center bg-light-success rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-success mr-5">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
                  className="svg-icon svg-icon-lg"
              ></SVG>
            </span>
              <div className="d-flex flex-column flex-grow-1 mr-2">
                <a
                    href="#"
                    className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  Would be to people
                </a>
                <span className="text-muted font-size-sm">Due in 2 Days</span>
              </div>

              <span className="font-weight-bolder text-success py-1 font-size-lg">
              +50%
            </span>
            </div>

            <div className="d-flex align-items-center bg-light-danger rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-danger mr-5">
              <SVG
                  src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Group-chat.svg"
                  )}
                  className="svg-icon svg-icon-lg"
              ></SVG>
            </span>
              <div className="d-flex flex-column flex-grow-1 mr-2">
                <a
                    href="#"
                    className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  Purpose would be to persuade
                </a>
                <span className="text-muted font-size-sm">Due in 2 Days</span>
              </div>

              <span className="font-weight-bolder text-danger py-1 font-size-lg">
              -27%
            </span>
            </div>

            <div className="d-flex align-items-center bg-light-info rounded p-5">
            <span className="svg-icon svg-icon-info mr-5">
              <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Attachment2.svg")}
                  className="svg-icon svg-icon-lg"
              ></SVG>
            </span>

              <div className="d-flex flex-column flex-grow-1 mr-2">
                <a
                    href="#"
                    className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  The best product
                </a>
                <span className="text-muted font-size-sm">Due in 2 Days</span>
              </div>

              <span className="font-weight-bolder text-info py-1 font-size-lg">
              +8%
            </span>
            </div>
          </div> */}
        </div>
      </div>
  );
}
