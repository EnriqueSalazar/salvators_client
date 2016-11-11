import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_CIUDADES_SUCCESS = 'LOAD_CIUDADES_SUCCESS';
export const LOAD_ONE_CIUDAD_SUCCESS = 'LOAD_ONE_CIUDAD_SUCCESS';
export const CREATE_CIUDAD_SUCCESS = 'CREATE_CIUDAD_SUCCESS';
export const UPDATE_CIUDAD_SUCCESS = 'UPDATE_CIUDAD_SUCCESS';
export const DESTROY_CIUDAD_SUCCESS = 'DESTROY_CIUDAD_SUCCESS';

export function loadCiudadesSuccess(ciudades) {
  return {type: LOAD_CIUDADES_SUCCESS, ciudades};
}
export function loadOneCiudadSuccess(ciudad) {
  return {type: LOAD_ONE_CIUDAD_SUCCESS, ciudad};
}
export function updateCiudadSuccess(ciudad) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_CIUDAD_SUCCESS, ciudad};
}
export function createCiudadSuccess(ciudad) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_CIUDAD_SUCCESS, ciudad};
}
export function destroyCiudadSuccess(ciudad) {
  toastr.success(ciudad.nombre+' Eliminación exitosa.');
  return {type: DESTROY_CIUDAD_SUCCESS, ciudad:{}};
}

export function loadCiudades() {
  return dispatch => {
    return Api.findAll(model.ciudad).then(ciudades => {
      dispatch(loadCiudadesSuccess(ciudades.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneCiudad(id) {
  return dispatch => {
    return Api.findOne(model.ciudad, id).then(ciudad => {
      dispatch(loadOneCiudadSuccess(ciudad.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateCiudad(id, payload) {
  debugger
  return dispatch => {
    return Api.update(model.ciudad, id, payload).then((ciudad) => {
      dispatch(updateCiudadSuccess(ciudad.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createCiudad(payload) {
  return dispatch => {
    return Api.create(model.ciudad, payload).then((ciudad) => {
      debugger
      dispatch(createCiudadSuccess(ciudad.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyCiudad(id) {
  return dispatch => {
    return Api.destroy(model.ciudad,id).then((ciudad) => {
      dispatch(destroyCiudadSuccess(ciudad.data));
    }).catch(error => {
      throw(error);
    });
  };
}

