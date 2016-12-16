import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_CANCELACIONES_SUCCESS = 'LOAD_CANCELACIONES_SUCCESS';
export const LOAD_ONE_CANCELACION_SUCCESS = 'LOAD_ONE_CANCELACION_SUCCESS';
export const CREATE_CANCELACION_SUCCESS = 'CREATE_CANCELACION_SUCCESS';
export const UPDATE_CANCELACION_SUCCESS = 'UPDATE_CANCELACION_SUCCESS';
export const DESTROY_CANCELACION_SUCCESS = 'DESTROY_CANCELACION_SUCCESS';

export function loadCancelacionesSuccess(cancelaciones) {
  return {type: LOAD_CANCELACIONES_SUCCESS, cancelaciones};
}
export function loadOneCancelacionSuccess(cancelacion) {
  return {type: LOAD_ONE_CANCELACION_SUCCESS, cancelacion};
}
export function updateCancelacionSuccess(cancelacion) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_CANCELACION_SUCCESS, cancelacion};
}
export function createCancelacionSuccess(cancelacion) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_CANCELACION_SUCCESS, cancelacion};
}
export function destroyCancelacionSuccess(cancelacion) {
  toastr.success(cancelacion.nombre+' Eliminación exitosa.');
  return {type: DESTROY_CANCELACION_SUCCESS, cancelacion:{}};
}

export function loadCancelaciones() {
  return dispatch => {
    return Api.findAll(model.cancelacion).then(cancelaciones => {
      dispatch(loadCancelacionesSuccess(cancelaciones.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneCancelacion(id) {
  return dispatch => {
    return Api.findOne(model.cancelacion, id).then(cancelacion => {
      dispatch(loadOneCancelacionSuccess(cancelacion.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateCancelacion(id, payload) {
  return dispatch => {
    return Api.update(model.cancelacion, id, payload).then((cancelacion) => {
      dispatch(updateCancelacionSuccess(cancelacion.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createCancelacion(payload) {
  return dispatch => {
    return Api.create(model.cancelacion, payload).then((cancelacion) => {
      dispatch(createCancelacionSuccess(cancelacion.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyCancelacion(id) {
  return dispatch => {
    return Api.destroy(model.cancelacion,id).then((cancelacion) => {
      dispatch(destroyCancelacionSuccess(cancelacion.data));
    }).catch(error => {
      throw(error);
    });
  };
}

