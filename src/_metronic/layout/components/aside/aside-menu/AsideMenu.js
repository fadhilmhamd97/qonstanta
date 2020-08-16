import React, {useMemo, useEffect} from "react";
import {AsideMenuList} from "./AsideMenuList";
import { useSelector } from "react-redux";
import {useHtmlClassService} from "../../../_core/MetronicLayout";

export function AsideMenu({disableScroll}) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      asideMenuAttr: uiService.getAttributes("aside_menu"),
      ulClasses: uiService.getClasses("aside_menu_nav", true),
      asideClassesFromConfig: uiService.getClasses("aside_menu", true)
    };
  }, [uiService]);

  const {roleConfig} = useSelector(state => state.auth)

  useEffect(() => console.info(roleConfig))

  return (
    <>
      {/* begin::Menu Container */}
      <div
        id="kt_aside_menu"
        data-menu-vertical="1"
        className={`aside-menu my-4 ${layoutProps.asideClassesFromConfig}`}
        {...layoutProps.asideMenuAttr}
      >
        <AsideMenuList navProps={roleConfig} layoutProps={layoutProps} />
      </div>
      {/* end::Menu Container */}
    </>
  );
}
