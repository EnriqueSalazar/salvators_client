import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_DOMICILIARIOS_SUCCESS = 'LOAD_DOMICILIARIOS_SUCCESS';
export const LOAD_ONE_DOMICILIARIO_SUCCESS = 'LOAD_ONE_DOMICILIARIO_SUCCESS';
export const CREATE_DOMICILIARIO_SUCCESS = 'CREATE_DOMICILIARIO_SUCCESS';
export const UPDATE_DOMICILIARIO_SUCCESS = 'UPDATE_DOMICILIARIO_SUCCESS';
export const DESTROY_DOMICILIARIO_SUCCESS = 'DESTROY_DOMICILIARIO_SUCCESS';

export function loadDomiciliariosSuccess(domiciliarios) {
  return {type: LOAD_DOMICILIARIOS_SUCCESS, domiciliarios};
}
export function loadOneDomiciliariosuccess(domiciliario) {
  return {type: LOAD_ONE_DOMICILIARIO_SUCCESS, domiciliario};
}
export function updateDomiciliariosuccess(domiciliario) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_DOMICILIARIO_SUCCESS, domiciliario};
}
export function createDomiciliariosuccess(domiciliario) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_DOMICILIARIO_SUCCESS, domiciliario};
}
export function destroyDomiciliariosuccess(domiciliario) {
  toastr.success(domiciliario.nombre+' Eliminación exitosa.');
  return {type: DESTROY_DOMICILIARIO_SUCCESS, domiciliario:{}};
}

export function loadDomiciliarios() {
  return dispatch => {
    return Api.findAll(model.domiciliario).then(domiciliarios => {
      dispatch(loadDomiciliariosSuccess(domiciliarios.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneDomiciliario(id) {
  return dispatch => {
    return Api.findOne(model.domiciliario, id).then(domiciliario => {
      dispatch(loadOneDomiciliariosuccess(domiciliario.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateDomiciliario(id, payload) {
    return dispatch => {
    return Api.update(model.domiciliario, id, payload).then((domiciliario) => {
      debugger
      dispatch(updateDomiciliariosuccess(domiciliario.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createDomiciliario(payload) {
    return dispatch => {
    return Api.create(model.domiciliario, payload).then((domiciliario) => {
      dispatch(createDomiciliariosuccess(domiciliario.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyDomiciliario(id) {
  return dispatch => {
    return Api.destroy(model.domiciliario,id).then((domiciliario) => {
      dispatch(destroyDomiciliariosuccess(domiciliario.data));
    }).catch(error => {
      throw(error);
    });
  };
}

