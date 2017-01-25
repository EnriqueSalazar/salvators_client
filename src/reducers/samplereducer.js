import { fromJS } from 'immutable';
import createReducer from 'create-reducer-map';
import {
  SET_GTM_ID,
  SET_USER,
  SET_LOCALE,
  DO_LOGIN,
  DO_LOGOUT,
  LOGIN_ERROR,
  COOKIE_ACCEPT,
  SESSION_EXPIRED,
} from './constants';
import browserStorage from '../../utils/browserStorage';

const cookiesAccepted = !!browserStorage.get('gry_cookies_accepted').value;

const initialState = fromJS({
  cookiesAccepted,
  isAuth: false,
  doLogin: true,
  sessionExpired: false,
  loginError: false,
  locale: 'en-GB',
  user: {
    consumer: {
      name: '',
    },
    customer: {
      products: [],
    },
  },
  gtmId: null,
});

export default createReducer(initialState, {
  [SET_GTM_ID]: (state, { gtmId }) => state.set('gtmId', gtmId),
  [SET_USER]: (state, { user }) => state.withMutations(s =>
    s.set('user', fromJS(user))
      .set('isAuth', true)
      .set('locale', user.locale)
  ),
  [SET_LOCALE]: (state, { locale }) => state.withMutations(s =>
    s.setIn(['user', 'locale'], locale)
      .set('locale', locale)
  ),
  [DO_LOGIN]: (state, loginInProgress) => state.set('doLogin', loginInProgress),
  [LOGIN_ERROR]: state => state.withMutations(s =>
    s.set('doLogin', false)
      .set('isAuth', false)
      .set('loginError', true)
  ),
  [DO_LOGOUT]: state => state.set('isAuth', false),
  [COOKIE_ACCEPT]: state => state.set('cookiesAccepted', true),
  [SESSION_EXPIRED]: state => state.withMutations(s =>
    s.set('isAuth', false)
      .set('sessionExpired', true)
  ),
});
