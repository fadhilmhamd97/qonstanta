import React, {Suspense, lazy, useEffect} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {BuilderPage} from "./pages/BuilderPage";
import {MyPage} from "./pages/MyPage";

import {DashboardPage} from "./pages/dashboard/index";

/* ADMIN DASHBOARD */
import AdminDashboard from "./pages/admin/dashboard/index";

import { ForgetPassword } from "./pages/forgetPassword/index";

const TryoutHistoryPage = lazy(() =>
  import("./pages/history/index")
);

const AdminVideoPage = lazy(() =>
  import("./pages/admin/videos/index")
);

const AdminEbookPage = lazy(() =>
  import("./pages/admin/ebook/index")
)

const BankVideoPage = lazy(() =>
import("./pages/admin/bank/index")
)

//Default Routes
const AdminPage = ({props}) => {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {<Redirect exact from="/" to="/admin/dashboard"/>}
                <ContentRoute path="/admin/dashboard" component={AdminDashboard} />

                {/* THESE IS ROUTE FOR QUERY EBOOK */}
                <Route path="/admin/ebook" component={AdminEbookPage} />

                {/* THESE IS ROUTE FOR QUERY VIDEO */}
                <Route path="/admin/videos" component={AdminVideoPage} />

                {/* THESE IS ROUTE FOR BANK SOAL */}
                <Route path="/admin/question" component={BankVideoPage} />

                <Redirect to="error/error-v1"/>
            </Switch>
        </Suspense>
    );
}

export default AdminPage