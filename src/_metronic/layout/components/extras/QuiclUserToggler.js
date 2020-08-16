/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import objectPath from "object-path";
import {useHtmlClassService} from "../../_core/MetronicLayout";
import {UserProfileDropdown} from "./dropdowns/UserProfileDropdown";

export function QuickUserToggler() {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);

  const {user_email, user_fullName} = useSelector(state => state.auth.authToken.userProps)

  return (<>
        {layoutProps.offcanvas && (<OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="quick-user-tooltip">View user</Tooltip>}
        >
          <div className="topbar-item">
            <div className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
                 id="kt_quick_user_toggle">
             <>

                <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi, </span>
                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                  {user_fullName}   
                </span>
              </>
            </div>
          </div>
        </OverlayTrigger>)}

        {!layoutProps.offcanvas && (<UserProfileDropdown/>)}
      </>
  );
}
