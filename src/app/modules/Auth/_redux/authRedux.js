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
            {id: 14, description: 'Pendaftaran', icon: 'note', route: 'master/tryout/register', childs: []},
            {id: 15, description: 'Jadwal Tryout', icon: 'schedule', route: 'master/tryout/schedule', childs: []},
            {id: 16, description: 'Riwayat Tryout', icon: 'history', route: 'master/tryout/history', childs: []}
          ]},
          {id: 17, description: 'Pembelajaran', icon: 'book', route: '/learn', childs: [
            {id: 18, description: 'Master Ebook', icon: 'paper', route: '/admin/ebook', childs: []},
            {id: 19, description: 'Master Video',  icon: 'videos', route: '/admin/videos', childs: []},
            {id: 20, description: 'Master Soal', icon: 'exam', route: '/admin/question', childs: []}
          ]},
          {id: 21, description: 'Edu Live Class', icon: 'live', route: '/live', childs: [
            {id: 22, description: 'Master Jadwal',icon: 'schedule', route: 'master/edu-live/schedule', childs: []}
          ]},
          {id: 23, description: 'Siswa', icon: 'users', route: '/student', childs: [
            {id: 24, description: 'Pendaftaran', icon: 'note', route: 'master/student/register', childs: []},
            {id: 25, description: 'Manajemen Siswa', icon: 'groups', route: 'master/student/manage-student', childs: []}
          ]},
          {id: 26, description: 'Promosi', icon: 'promotion', route: '/promotion', childs: [
            {id: 27, description: 'Tryout', icon: 'exam', route: 'master/promotion/try-out', childs: []}
          ]}              
          
        ]

        //dummy validation
        let _listNav = []
        let _adminProps = {}

        if(authToken.email !== 'admin@admin.com')
          _listNav = [...studentRole]
        else{
          _listNav = [...adminRole]
          _adminProps = {..._adminProps, user_fullName: 'Administrator', user_email: 'admin@admin.com', profile_phoneNumber: '085890333486'}
        }

        return { authToken, user: authToken.email !== 'admin@admin.com' ? authToken.email : JSON.stringify(_adminProps), propsUser: authToken.email !== 'admin@admin.com' ? authToken.userProps : _adminProps, roleConfig: _listNav, role: authToken.email === 'admin@admin.com' ? 'admin' : 'default' };
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
