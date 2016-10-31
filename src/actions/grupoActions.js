import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_GRUPOS_SUCCESS = 'LOAD_GRUPOS_SUCCESS';
export const LOAD_ONE_GRUPO_SUCCESS = 'LOAD_ONE_GRUPO_SUCCESS';
export const CREATE_GRUPO_SUCCESS = 'CREATE_GRUPO_SUCCESS';
export const UPDATE_GRUPO_SUCCESS = 'UPDATE_GRUPO_SUCCESS';
export const DESTROY_GRUPO_SUCCESS = 'DESTROY_GRUPO_SUCCESS';

export function loadGruposSuccess(grupos) {
  return {type: LOAD_GRUPOS_SUCCESS, grupos};
}
export function loadOneGrupoSuccess(grupo) {
  return {type: LOAD_ONE_GRUPO_SUCCESS, grupo};
}
export function updateGrupoSuccess(grupo) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_GRUPO_SUCCESS, grupo};
}
export function createGrupoSuccess(grupo) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_GRUPO_SUCCESS, grupo};
}
export function destroyGrupoSuccess(grupo) {
  toastr.success(grupo.nombre+' Eliminación exitosa.');
  return {type: DESTROY_GRUPO_SUCCESS, grupo:{}};
}

export function loadGrupos() {
  return dispatch => {
    return Api.findAll(model.grupomenu).then(grupos => {
      dispatch(loadGruposSuccess(grupos.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneGrupo(id) {
  return dispatch => {
    return Api.findOne(model.grupomenu, id).then(grupo => {
      dispatch(loadOneGrupoSuccess(grupo.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateGrupo(id, payload) {
  debugger
  return dispatch => {
    return Api.update(model.grupomenu, id, payload).then((grupo) => {
      debugger
      dispatch(updateGrupoSuccess(grupo.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createGrupo(payload) {
  debugger
  return dispatch => {
    return Api.create(model.grupomenu, payload).then((grupo) => {
      debugger
      dispatch(createGrupoSuccess(grupo.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyGrupo(id) {
  return dispatch => {
    return Api.destroy(model.grupomenu,id).then((grupo) => {
      dispatch(destroyGrupoSuccess(grupo.data));
    }).catch(error => {
      throw(error);
    });
  };
}

