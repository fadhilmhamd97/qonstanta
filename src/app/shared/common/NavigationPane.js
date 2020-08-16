import React,{forwardRef, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import clsx from "clsx";
import copy from "clipboard-copy";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {coy as highlightStyle} from "react-syntax-highlighter/dist/esm/styles/prism";
import {isFragment} from "react-is";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemIcon,
    Drawer,
    Button
  } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {makeStyles} from "@material-ui/core/styles";
  

export const CardHeaderIcon = forwardRef(({ className }, ref) => (
  <span ref={ref} className={clsx("card-head-icon", className)} />
));

export const CardHeaderTitle = forwardRef(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h3 {...props} ref={ref} className={clsx("card-label", className)} />
));

export const CardHeaderToolbar = forwardRef(
  ({ children, className, ...props }, ref) => (
    <div {...props} ref={ref} className={clsx("card-toolbar", className)}>
      {children}
    </div>
  )
);

export const CardHeader = forwardRef(
  (
    {
      children,
      icon,
      title,
      toolbar,
      className,
      sticky = false,
      labelRef,
      ...props
    },
    ref
  ) => {
    const [top, setTop] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
      handleResize();

      function handleResize() {
        setWindowHeight(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });

    useEffect(() => {
      // Skip if sticky is disabled or on initial render when we don't know about window height.
      if (!sticky || windowHeight === 0) {
        return;
      }

      const headerElement = document.querySelector(".header");
      const subheaderElement = document.querySelector(".subheader");
      const headerMobileElement = document.querySelector(".header-mobile");

      let nextMarginTop = 0;

      // mobile header
      if (window.getComputedStyle(headerElement).height === "0px") {
        nextMarginTop = headerMobileElement.offsetHeight;
      } else {
        // desktop header
        if (document.body.classList.contains("header-minimize-topbar")) {
          // hardcoded minimized header height
          nextMarginTop = 60;
        } else {
          // normal fixed header
          if (document.body.classList.contains("header-fixed")) {
            nextMarginTop += headerElement.offsetHeight;
          }

          if (document.body.classList.contains("subheader-fixed")) {
            nextMarginTop += subheaderElement.offsetHeight;
          }
        }
      }

      setTop(nextMarginTop);
    }, [sticky, windowHeight]);

    return (
      <div
        ref={ref}
        className="card-header"
        style={
          !sticky
            ? undefined
            : { top, position: "sticky", backgroundColor: "#fff" }
        }
      >
        {title != null && (
          <div ref={labelRef} className={clsx("card-title", className)}>
            {icon}

            {/* Wrap string and fragments in CardHeaderTitle */
            typeof title === "string" || isFragment(title) ? (
              <CardHeaderTitle>{title}</CardHeaderTitle>
            ) : (
              title
            )}
          </div>
        )}

        {toolbar}
        {children}
        <Button>TES</Button>
      </div>
    );
  }
);

export const CardBody = forwardRef(
  ({ fit, fluid, className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={clsx(
        "card-body",
        {
          "card-body-fit": fit,
          "card-body-fluid": fluid
        },
        className
      )}
    />
  )
);

export const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div {...props} ref={ref} className={clsx("card-footer", className)} />
));

export const Card = forwardRef(({ fluidHeight, className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={clsx(
      "card card-custom gutter-b",
      { "card-height-fluid": fluidHeight },
      className
    )}
  />
));

// Set display names for debugging.
if (process.env.NODE_ENV !== "production") {
  Card.displayName = "Card";

  CardHeader.displayName = "CardHeader";
  CardHeaderIcon.displayName = "CardHeaderIcon";
  CardHeaderTitle.displayName = "CardHeaderTitle";
  CardHeaderToolbar.displayName = "CardHeaderToolbar";

  CardBody.displayName = "CardBody";
  CardFooter.displayName = "CardFooter";
}


const KTCodeExample = ({
  jsCode,
  children,
  beforeCodeTitle,
  languages,
  codeBlockHeight
}) => {
  const defaultLanguages = !languages
    ? [
        {
          code: jsCode,
          language: "javascript",
          shortCode: "JS"
        }
      ]
    : languages;
  const [isCodeBlockShown, setIsCodeBlockShown] = useState(false);
  const [tabId, setTabId] = useState(0);
  const [customStyle, setCustomStyle] = useState({});
  useEffect(() => {
    const styles = {};

    if (codeBlockHeight) {
      styles.height = codeBlockHeight;
      styles.overflowX = "auto";
    }

    if (defaultLanguages.length > 1) {
      styles.background = `none transparent !important`;
    }

    setCustomStyle(styles);
  }, [codeBlockHeight, defaultLanguages.length]);

  const toolbar = (
    <div className="card-toolbar">
      <div className="example-tools">
        <CodeBlockToolbar
          showViewCode={true}
          code={defaultLanguages[tabId].code}
          isCodeBlockShown={isCodeBlockShown}
          setIsCodeBlockShown={setIsCodeBlockShown}
        />
      </div>
    </div>
  );

  return (
    <Card className="example example-compact">
      <CardHeader title={beforeCodeTitle} toolbar={toolbar} />
      <CardBody>
        <>{children}</>
        <KTCodeBlock
          languages={defaultLanguages}
          tabs={{ tabId, setTabId }}
          codeShown={{ isCodeBlockShown, setIsCodeBlockShown }}
          customStyle={customStyle}
        />
      </CardBody>
    </Card>
  );
}


export const KTCodeBlock = ({ languages, tabs, codeShown, customStyle }) => {
  const { isCodeBlockShown } = codeShown;
  const { tabId, setTabId } = tabs;
  return (
    <>
      {languages.length === 0 && <></>}
      {languages.length === 1 && (
        <div
          className={`example-code mt-5 ${clsx({
            "example-code-on": isCodeBlockShown
          })}`}
          style={{ display: isCodeBlockShown ? "block" : "none" }}
        >
          <div className={`example-highlight jsx`}>
            <SyntaxHighlighter
              language="jsx"
              style={highlightStyle}
              customStyle={customStyle}
            >
              {languages[0].code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
      {languages.length > 1 && (
        <>
          <div
            className={`example-code mt-5 ${clsx({
              "example-code-on": isCodeBlockShown
            })}`}
            style={{ display: isCodeBlockShown ? "block" : "none" }}
          >
            <ul
              className="example-nav nav nav-tabs nav-tabs-line nav-tabs-line-2x nav-tabs-primary"
              id="codeTab"
              role="tablist"
            >
              {languages.map((lang, index) => (
                <li className="nav-item" key={`ki${index}`}>
                  <a
                    className={`nav-link ${tabId === index ? "active" : ""}`}
                    data-toggle="tab"
                    role="tab"
                    aria-selected={`${tabId === index ? "true" : "false"}`}
                    onClick={() => setTabId(index)}
                  >
                    {lang.shortCode}
                  </a>
                </li>
              ))}
            </ul>
            <div className="tab-content">
              {languages.map((lang, index) => (
                <div
                  style={{ background: "#F3F6F9" }}
                  className={`tab-pane  ${tabId === index ? "active" : ""}`}
                  key={`divTabPane${index}`}
                >
                  <div
                    className={`example-highlight language-${lang.shortCode} ${lang.shortCode}`}
                  >
                    <SyntaxHighlighter
                      language="jsx"
                      style={highlightStyle}
                      customStyle={customStyle}
                    >
                      {lang.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
    </>
  );
};

const CodeBlockToolbar = ({
  showViewCode = false,
  code,
  isCodeBlockShown,
  setIsCodeBlockShown
}) => {
  const [isCopySucceed, setIsCopySucceed] = useState(false);
  const copyCode = () => {
    copy(code).then(() => {
      setIsCopySucceed(true);
      setTimeout(() => {
        setIsCopySucceed(false);
      }, 2000);
    });
  };

  const toggleShowCode = () => {
    setIsCodeBlockShown(!isCodeBlockShown);
  };

  return (
    <>
      {showViewCode && (
        <Tooltip title={`${isCodeBlockShown ? "" : "View code"}`}>
          <span
            className={`example-toggle ${clsx({
              "example-toggled": isCodeBlockShown
            })}`}
            onClick={toggleShowCode}
          />
        </Tooltip>
      )}
      <Tooltip title="Copy code">
        <span
          className={`example-copy ${clsx({
            "example-copied": isCopySucceed
          })}`}
          onClick={copyCode}
        />
      </Tooltip>
    </>
  );
}


const ButtonTypes = ({type = null, clickAction, icon}) => {
    if(type){
        switch(type){
            case "primary":
                return(<>
                    <button onClick={clickAction} className="btn btn-sm btn-icon btn-bg-light btn-text-primary btn-hover-primary" type="button">
                        <i className={icon}></i>
                    </button>
                </>)
            case "warning":
                return(<>
                    <button onClick={clickAction} className="btn btn-sm btn-icon btn-bg-light btn-text-warning btn-hover-warning" type="button">
                        <i className={icon}></i>
                    </button>
                </>)
            default:
                return(<></>)
        }
    }
    
    return(<></>)
}

const useStyles1 = makeStyles({
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    }
});

export const NavigationPane = ({propsTools, children, handleClick}) => {
  const [state1, setState1] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  useEffect(() => {
    setState1({ ...state1, ["right"]: handleClick });
  }, [handleClick])

  const classes1 = useStyles1();

  if(propsTools)
  {
    const sideList1 = side => (
        <div
          className={classes1.list}
          role="presentation"
        >
          {children}
        </div>
      );

     const toggleDrawer1 = (side, open) => event => {
    
        setState1({ ...state1, [side]: open });
      };

      return(<>
                <ul class="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">
                    {propsTools.map((v, i) => {
                        const {icon, tooltip, buttonTypes} = v
                        return(
                        <OverlayTrigger
                            key={i}
                            placement="left"
                            overlay={<Tooltip>{tooltip}</Tooltip>}>
                            <li className="nav-item mb-2" data-placement="left">
                                <ButtonTypes type={buttonTypes} icon={icon} clickAction={toggleDrawer1("right", true)} />
                            </li> 
                        </OverlayTrigger>)
                    })}
                </ul>
                <Drawer
                    anchor="right"
                    open={state1.right}
                    variant="persistent"
                >
                    {sideList1("right")}
                </Drawer>
      </>)
  }
  return(<></>)
}

export default NavigationPane