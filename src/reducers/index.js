/**
 * Created by enriq on 6/09/16.
 */
import { combineReducers } from 'redux';
import {
  syncHistoryWithStore,
  routerReducer
} from 'react-router-redux';
import
  ReduxToastr,
{
  reducer as toastrReducer
} from 'react-redux-toastr';
import {reducer as formReducer} from 'redux-form';
// import logReducer from './logReducer';
import modificadorReducer from './modificadorReducer';
import submodificadorReducer from './submodificadorReducer';
import modSubmodReducer from './modSubmodReducer';
import grupoReducer from './grupoReducer';
import formaPagoReducer from './formaPagoReducer';
import descuentoReducer from './descuentoReducer';
import itemReducer from './itemReducer';
import itemModReducer from './itemModReducer';
// import usuariosReducer from './usuariosReducer';
// import permisosReducer from './permisosReducer';

const appReducers = combineReducers({
  // logReducer,
  modificadorReducer,
  modSubmodReducer,
  submodificadorReducer,
  grupoReducer,
  itemReducer,
  itemModReducer,
  formaPagoReducer,
  descuentoReducer,
  // usuariosReducer,
  // permisosReducer,
  routing: routerReducer,
  toastr: toastrReducer,
  form: formReducer
});

export default appReducers;
