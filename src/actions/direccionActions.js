import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_DIRECCIONES_SUCCESS = 'LOAD_DIRECCIONES_SUCCESS';
export const LOAD_ONE_DIRECCION_SUCCESS = 'LOAD_ONE_DIRECCION_SUCCESS';
export const CREATE_DIRECCION_SUCCESS = 'CREATE_DIRECCION_SUCCESS';
export const UPDATE_DIRECCION_SUCCESS = 'UPDATE_DIRECCION_SUCCESS';
export const DESTROY_DIRECCION_SUCCESS = 'DESTROY_DIRECCION_SUCCESS';

export function loadDireccionesSuccess(direcciones) {
  return {type: LOAD_DIRECCIONES_SUCCESS, direcciones};
}
export function loadOneDireccionSuccess(direccion) {
  return {type: LOAD_ONE_DIRECCION_SUCCESS, direccion};
}
export function updateDireccionSuccess(direccion) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_DIRECCION_SUCCESS, direccion};
}
export function createDireccionSuccess(direccion) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_DIRECCION_SUCCESS, direccion};
}
export function destroyDireccionSuccess(direccion) {
  toastr.success(direccion.nombre+' Eliminación exitosa.');
  return {type: DESTROY_DIRECCION_SUCCESS, direccion:{}};
}

export function loadDirecciones() {
  return dispatch => {
    return Api.findAll(model.direccion).then(direcciones => {
      dispatch(loadDireccionesSuccess(direcciones.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneDireccion(id) {
  return dispatch => {
    return Api.findOne(model.direccion, id).then(direccion => {
      dispatch(loadOneDireccionSuccess(direccion.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateDireccion(id, payload) {
  return dispatch => {
    return Api.update(model.direccion, id, payload).then((direccion) => {
      dispatch(updateDireccionSuccess(direccion.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createDireccion(payload) {
  debugger
  return dispatch => {
    return Api.create(model.direccion, payload).then((direccion) => {
      dispatch(createDireccionSuccess(direccion.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyDireccion(id) {
  return dispatch => {
    return Api.destroy(model.direccion,id).then((direccion) => {
      dispatch(destroyDireccionSuccess(direccion.data));
    }).catch(error => {
      throw(error);
    });
  };
}

