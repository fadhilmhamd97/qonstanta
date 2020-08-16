import React, {Suspense, lazy, useEffect} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {BuilderPage} from "./pages/BuilderPage";
import {MyPage} from "./pages/MyPage";

import {DashboardPage} from "./pages/dashboard/index";

/* ADMIN DASHBOARD */
import AdminDashboard from "./pages/admin/dashboard/index";


import { ForgetPassword } from "./pages/forgetPassword/index";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

const RegisterModulePage = lazy(() =>
  import("./pages/cart/index")
);

const TryoutHistoryPage = lazy(() =>
  import("./pages/history/index")
);

const VideoLearningPage = lazy(() =>
  import("./pages/videos/index")
);

const EbookLearningPage = lazy(() => 
  import("./pages/ebook/index")
);

const ModuleBookLearningPage = lazy(() =>
  import("./pages/ebook/subs/Modules")
)

const ModuleLearningPage = lazy(() =>
  import("./pages/videos/subs/Modules")
)

const ModuleBank = lazy(() =>
  import("./pages/bank/subs/Modules")
)

const Bank = lazy(() => 
  import("./pages/bank/index")
)

const BankModules = lazy(() => 
  import("./pages/bank/pages/BankIndex")
)

const Edulive = lazy(() =>
  import("./pages/edulive/index")
)

const EduliveEjector = lazy(() =>
  import("./pages/edulive/pages/ClassEjector")
)

const KlinikSiswa = lazy(() =>
  import('./pages/klinikSiswa/index')
)

const KlinikSiswaBook = lazy(() => 
  import('./pages/klinikSiswa/pages/Booking')
)

const KlinikSiswaSchedule = lazy(() => 
  import('./pages/klinikSiswa/pages/Schedule')
)

const KlinikSiswaFacultyDetail = lazy(() => 
  import('./pages/klinikSiswa/pages/FacultyDetail')
)

//Default Routes
export default function BasePage({roleProps}) {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {<Redirect exact from="/" to="/dashboard"/>}
                
                <ContentRoute path="/dashboard" component={DashboardPage}/>

                <Route exact path="/learn/ebook/:id" component={EbookLearningPage} />
                <Route exact path="/learn/ebook" component={ModuleBookLearningPage} />

                {/* THESE IS ROUTE FOR QUERY VIDEO */}
                <Route exact path="/learn/videos/:id" component={VideoLearningPage} />
                <Route exact path="/learn/videos" component={ModuleLearningPage} />

                {/* THESE IS ROUTE FOR BANK SOAL */}
                <Route exact path="/bank/module" component={BankModules} />
                <Route exact path="/bank/:id" component={Bank} />
                <Route exact path="/bank" component={ModuleBank} />

                {/* THESE IS ROUTE FOR EDU LIVE */}
                <Route exact path="/edulive/session" component={EduliveEjector} />
                <Route exact path="/edulive" component={Edulive} />

                {/* THESE IS ROUTE FOR KLINIK SISWA */}
                <Route exact path="/klinik-siswa/book" component={KlinikSiswaBook} />
                <Route exact path="/klinik-siswa/book/:id" component={KlinikSiswaFacultyDetail} />
                <Route exact path="/klinik-siswa/schedule" component={KlinikSiswaSchedule} />
                <Route exact path="/klinik-siswa" component={KlinikSiswa} />

                <Route exact path="/module/register/:id" component={RegisterModulePage} />
                <Route exact path="/tryout/history" component={TryoutHistoryPage} />
                <Route exact path="/profile/change-password" component={ForgetPassword} />

                <ContentRoute path="/builder" component={BuilderPage}/>
                <ContentRoute path="/my-page" component={MyPage}/>
                <Route path="/google-material" component={GoogleMaterialPage}/>
                <Route path="/react-bootstrap" component={ReactBootstrapPage}/>
                <Route path="/e-commerce" component={ECommercePage}/>
                {/* <Redirect to="error/error-v1"/> */}
            </Switch>
        </Suspense>
    );
}
