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

const AdminVideoCreatingPage = lazy(() =>
  import("./pages/admin/videos/pages/CreateVideoLearn")
)

const AdminEbookPage = lazy(() =>
  import("./pages/admin/ebook/index")
)

const BankVideoPage = lazy(() =>
  import("./pages/admin/bank/index")
)

const AdminEdulivePage = lazy(() =>
  import("./pages/admin/edulive/index")
)

const AdminEduliveRequestPage = lazy(() =>
  import('./pages/admin/edulive/pages/request/index')
)

const AdminEduliveRequestEditPage = lazy(() =>
  import('./pages/admin/edulive/pages/request/pages/EditEduliveScheduleRequest')
)

const AdminCreateEdulivePage = lazy(() =>
  import("./pages/admin/edulive/pages/CreateEduliveSchedule")
)

const AdminMasterTryoutPage = lazy(() =>
  import("./pages/admin/tryout/index")
)

/* TRY OUT */

const AdminTryoutPacketPage = lazy(() =>
  import("./pages/admin/tryout/pages/packet/TryoutPacket")
)

const AdminTryoutTypePage = lazy(() => 
  import("./pages/admin/tryout/pages/type/TryoutPacketType")
)

const AdminTryoutSchedulePage = lazy(() => 
  import("./pages/admin/tryout/index")
)

const AdminTryoutScheduleDetailPage = lazy(() =>
  import("./pages/admin/tryout/pages/detail/TryoutScheduleDetailList")
)

/* QUESTION PACKET */
const AdminMasterQuestionPage = lazy(() =>
  import("./pages/admin/questions/index")
)

const AdminMasterQuestionCreatePage = lazy(() =>
  import("./pages/admin/questions/pages/CreateQuestions")
)

const AdminQuestionPacketType = lazy(() =>
  import("./pages/admin/questions/pages/QuestionPacketTypeList")
)

const AdminQuestionPacket = lazy(() =>
  import("./pages/admin/questions/pages/QuestionPacketList")
)

/* QUESTION */
const AdminQuestion = lazy(() =>
  import("./pages/admin/questions/pages/QuestionList")
)

const AdminQuestionEdit = lazy(() => 
  import("./pages/admin/questions/pages/QuestionPacketEdit")
)

/* ANSWER */
const AdminAnswersPage = lazy(() =>
  import("./pages/admin/questions/pages/QuestionEdit")
)

/* MASTER DATA */
const AdminMajorPage = lazy(() =>
  import("./pages/admin/master/major/MasterMajor")
)

const AdminFormulaPage = lazy(() =>
  import("./pages/admin/master/formula/MasterFormula")
)

const AdminCoursePage = lazy(() =>
  import("./pages/admin/master/course/MasterCourse")
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
                <Route path="/admin/videos/create" exact component={AdminVideoCreatingPage} />
                <Route path="/admin/videos" component={AdminVideoPage} />

                {/* THESE IS ROUTE FOR BANK SOAL */}
                <Route path="/admin/question" component={BankVideoPage} />

                {/* THESE IS ROUTE FOR MASTER SOAL */}
                <Route path="/admin/module-questions/create" exact component={AdminMasterQuestionCreatePage} />
                <Route path="/admin/module-questions/question-packet-type" exact component={AdminQuestionPacketType} />
                <Route path="/admin/module-questions/question-packet" exact component={AdminQuestionPacket} />
                <Route path="/admin/module-questions/question-packet/edit" component={AdminQuestionEdit} />
                <Route path="/admin/module-questions/question" exact component={AdminQuestion} />
                {/* <Route path="/admin/module-questions" exact component={AdminMasterQuestionPage} /> */}


                {/* ROUTE FOR ANSWERS / OPTION */}
                <Route path="/admin/answers/edit" exact component={AdminAnswersPage} />

                {/* ROUTE FOR EDU LIVE */}
                <Route path="/admin/edulive/create" exact component={AdminCreateEdulivePage} />
                <Route path="/admin/edulive/request" exact component={AdminEduliveRequestPage} />
                <Route path="/admin/edulive/request/edit" exact component={AdminEduliveRequestEditPage} />
                <Route path="/admin/edulive" component={AdminEdulivePage} />

                {/* ROUTE FOR TRY OUT */}
                <Route path="/admin/tryout/schedule-detail" exact component={AdminTryoutScheduleDetailPage} />
                <Route path="/admin/tryout/schedule" exact component={AdminTryoutSchedulePage} />
                <Route path="/admin/tryout/packet" exact component={AdminTryoutPacketPage} />
                <Route path="/admin/tryout/type" exact component={AdminTryoutTypePage} />
                <Route path="/admin/tryout" exact component={AdminMasterTryoutPage} />

                {/* ROUTE FOR MASTER DATA */}
                <Route path="/admin/master/major" exact component={AdminMajorPage} />
                <Route path="/admin/master/formula" exact component={AdminFormulaPage} />
                <Route path="/admin/master/course" exact component={AdminCoursePage} />
                <Redirect to="error/error-v1"/>
            </Switch>
        </Suspense>
    );
}

export default AdminPage