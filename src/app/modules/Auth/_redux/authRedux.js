import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  roleConfig: []
};

export const reducer = persistReducer(
  { storage, key: "userCtx", whitelist: ["user", "authToken", "roleConfig", "role"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        //Here is a dummy thing
        const studentRole = [
          {id: 1, description: 'Dashboard', icon: 'dashboard', route: '/dashboard', childs: []},
          {id: 2, description: 'Pembelajaran', icon: 'users', route: '/student', childs: [
            {id: 3, description: 'Video', icon: 'videos', route: '/learn/videos', childs: []},
            {id: 4, description: 'E-Book', icon: 'paper', route: '/learn/ebook', childs: []},
            {id: 5, description: 'Bank Soal', icon: 'exam', route: '/bank/module', childs: []}
          ]},
          {id: 6, description: 'Edu Live Class', icon: 'live', route: '/edulive', childs: []},
          {id: 7, description: 'Klinik Siswa', icon: 'groups', route: '/klinik-siswa', childs: []},
          {id: 8, description: 'Seputar Info', icon: 'note', route: '/info', childs: []},
          {id: 9, description: 'Tentang Qonstanta', icon: 'promotion', route: '/about', childs: []}
        ]

        const adminRole = [
          {id: 12, description: 'Dashboard', icon: 'dashboard', route: '/dashboard',childs: []},
          {id: 13, description: 'Try Out', icon: 'exam', route: '/tryout',childs: [
            {id: 14, description: 'Try Out Packet Type', icon: 'question-types', route:'/admin/tryout/type', childs:[]},
            {id: 15, description: 'Try Out Packet', icon: 'question-packet', route: '/admin/tryout/packet', childs: []},
            {id: 16, description: 'Try out Schedule', icon: 'times', route: '/admin/tryout/schedule', childs: []}
          ]},
          {id: 17, description: 'Master Data', icon: 'book', route: '/learn', childs: [
            {id: 18, description: 'Formula', icon: 'paper', route: '/admin/master/formula', childs: []},
            {id: 19, description: 'Grade',  icon: 'videos', route: '/admin/master/videos', childs: []},
            {id: 20, description: 'Major', icon: 'exam', route: '/admin/master/major', childs: []},
            {id: 21, description: 'Course', icon: 'exam', route: '/admin/master/course', childs: []},
          ]},
          {id: 22, description: 'Learning', icon: 'exam', route: '/admin/question', childs: [
            {id: 23, description: 'Ebook', icon: 'exam', route: '/admin/question', childs: []},
            {id: 24, description: 'Video', icon: 'exam', route: '/admin/question', childs: []},
          ]},
          // {id: 21, description: 'Edu Live Class', icon: 'live', route: '/live', childs: [
          //   {id: 22, description: 'Master Jadwal',icon: 'schedule', route: '/admin/edulive', childs: []},
          //   {id: 23, description: 'Master Request', icon: 'accessibility', route: '/admin/edulive/request', childs: []}
          // ]},
          {id: 25,description: 'Question Modules', icon: 'question', route: '/question', childs: [
            {id: 26, description: 'Question Packet Type', icon: 'question-types', route: '/admin/module-questions/question-packet-type', childs: []},
            {id: 27, description: 'Question Packet', icon: 'question-packet', route: '/admin/module-questions/question-packet', childs: []}
          ]},
          // {id: 28, description: 'Siswa', icon: 'users', route: '/student', childs: [
          //   {id: 29, description: 'Pendaftaran', icon: 'note', route: 'master/student/register', childs: []},
          //   {id: 30, description: 'Manajemen Siswa', icon: 'groups', route: 'master/student/manage-student', childs: []}
          // ]},
          // {id: 31, description: 'Promosi', icon: 'promotion', route: '/promotion', childs: [
          //   {id: 32, description: 'Tryout', icon: 'exam', route: 'master/promotion/try-out', childs: []}
          // ]}              
        ]

        //dummy validation
        let _listNav = []
        let _adminProps = {}

        if(authToken.email !== 'qonstanta.admin@gmail.com')
          _listNav = [...studentRole]
        else{
          _listNav = [...adminRole]
        }

        return { authToken, user: authToken.email, propsUser: authToken.userProps, roleConfig: _listNav, role: authToken.email === 'qonstanta.admin@gmail.com' ? 'admin' : 'default' };
      }

      case actionTypes.Register: {  
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {

    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });
}
