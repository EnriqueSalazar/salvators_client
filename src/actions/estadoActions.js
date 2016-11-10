import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_ESTADOS_SUCCESS = 'LOAD_ESTADOS_SUCCESS';
export const LOAD_ONE_ESTADO_SUCCESS = 'LOAD_ONE_ESTADO_SUCCESS';
export const CREATE_ESTADO_SUCCESS = 'CREATE_ESTADO_SUCCESS';
export const UPDATE_ESTADO_SUCCESS = 'UPDATE_ESTADO_SUCCESS';
export const DESTROY_ESTADO_SUCCESS = 'DESTROY_ESTADO_SUCCESS';

export function loadEstadosSuccess(estados) {
  return {type: LOAD_ESTADOS_SUCCESS, estados};
}
export function loadOneEstadoSuccess(estado) {
  return {type: LOAD_ONE_ESTADO_SUCCESS, estado};
}
export function updateEstadoSuccess(estado) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_ESTADO_SUCCESS, estado};
}
export function createEstadoSuccess(estado) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_ESTADO_SUCCESS, estado};
}
export function destroyEstadoSuccess(estado) {
  toastr.success(estado.nombre+' Eliminación exitosa.');
  return {type: DESTROY_ESTADO_SUCCESS, estado:{}};
}

export function loadEstados() {
  return dispatch => {
    return Api.findAll(model.estado).then(estados => {
      dispatch(loadEstadosSuccess(estados.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneEstado(id) {
  return dispatch => {
    return Api.findOne(model.estado, id).then(estado => {
      dispatch(loadOneEstadoSuccess(estado.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateEstado(id, payload) {
  debugger
  return dispatch => {
    return Api.update(model.estado, id, payload).then((estado) => {
      debugger
      dispatch(updateEstadoSuccess(estado.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createEstado(payload) {
  debugger
  return dispatch => {
    return Api.create(model.estado, payload).then((estado) => {
      debugger
      dispatch(createEstadoSuccess(estado.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyEstado(id) {
  return dispatch => {
    return Api.destroy(model.estado,id).then((estado) => {
      dispatch(destroyEstadoSuccess(estado.data));
    }).catch(error => {
      throw(error);
    });
  };
}

