import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../../cfg/'

export const LOAD_FORMASPAGO_SUCCESS = 'LOAD_FORMASPAGO_SUCCESS';
export const LOAD_ONE_FORMAPAGO_SUCCESS = 'LOAD_ONE_FORMAPAGO_SUCCESS';
export const CREATE_FORMAPAGO_SUCCESS = 'CREATE_FORMAPAGO_SUCCESS';
export const UPDATE_FORMAPAGO_SUCCESS = 'UPDATE_FORMAPAGO_SUCCESS';
export const DESTROY_FORMAPAGO_SUCCESS = 'DESTROY_FORMAPAGO_SUCCESS';

export function loadFormasPagoSuccess(formasPago) {
  return {type: LOAD_FORMASPAGO_SUCCESS, formasPago};
}
export function loadOneFormasPagouccess(formaPago) {
  return {type: LOAD_ONE_FORMAPAGO_SUCCESS, formaPago};
}
export function updateFormasPagouccess(formaPago) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_FORMAPAGO_SUCCESS, formaPago};
}
export function createFormasPagouccess(formaPago) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_FORMAPAGO_SUCCESS, formaPago};
}
export function destroyFormasPagouccess(formaPago) {
  toastr.success(formaPago.nombre+' Eliminación exitosa.');
  return {type: DESTROY_FORMAPAGO_SUCCESS, formaPago:{}};
}

export function loadFormasPago() {
  return dispatch => {
    return Api.findAll(model.formaPagomenu).then(formasPago => {
      dispatch(loadFormasPagoSuccess(formasPago.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneFormaPago(id) {
  return dispatch => {
    return Api.findOne(model.formaPagomenu, id).then(formaPago => {
      dispatch(loadOneFormasPagouccess(formaPago.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateFormaPago(id, payload) {
  debugger
  return dispatch => {
    return Api.update(model.formaPagomenu, id, payload).then((formaPago) => {
      debugger
      dispatch(updateFormasPagouccess(formaPago.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createFormaPago(payload) {
  debugger
  return dispatch => {
    return Api.create(model.formaPagomenu, payload).then((formaPago) => {
      debugger
      dispatch(createFormasPagouccess(formaPago.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyFormaPago(id) {
  return dispatch => {
    return Api.destroy(model.formaPagomenu,id).then((formaPago) => {
      dispatch(destroyFormasPagouccess(formaPago.data));
    }).catch(error => {
      throw(error);
    });
  };
}

