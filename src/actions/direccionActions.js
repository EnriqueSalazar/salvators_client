import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_DIRECCIONS_SUCCESS = 'LOAD_DIRECCIONS_SUCCESS';
export const LOAD_ONE_DIRECCION_SUCCESS = 'LOAD_ONE_DIRECCION_SUCCESS';
export const CREATE_DIRECCION_SUCCESS = 'CREATE_DIRECCION_SUCCESS';
export const UPDATE_DIRECCION_SUCCESS = 'UPDATE_DIRECCION_SUCCESS';
export const DESTROY_DIRECCION_SUCCESS = 'DESTROY_DIRECCION_SUCCESS';

export function loadDireccionsSuccess(direccions) {
  return {type: LOAD_DIRECCIONS_SUCCESS, direccions};
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

export function loadDireccions() {
  return dispatch => {
    return Api.findAll(model.direccionmenu).then(direccions => {
      dispatch(loadDireccionsSuccess(direccions.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneDireccion(id) {
  return dispatch => {
    return Api.findOne(model.direccionmenu, id).then(direccion => {
      dispatch(loadOneDireccionSuccess(direccion.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateDireccion(id, payload) {
  debugger
  return dispatch => {
    return Api.update(model.direccionmenu, id, payload).then((direccion) => {
      debugger
      dispatch(updateDireccionSuccess(direccion.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createDireccion(payload) {
  debugger
  return dispatch => {
    return Api.create(model.direccionmenu, payload).then((direccion) => {
      debugger
      dispatch(createDireccionSuccess(direccion.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyDireccion(id) {
  return dispatch => {
    return Api.destroy(model.direccionmenu,id).then((direccion) => {
      dispatch(destroyDireccionSuccess(direccion.data));
    }).catch(error => {
      throw(error);
    });
  };
}

