import { toastr } from 'react-redux-toastr';
import Api from '../api/Api';
import { model } from '../../cfg/'

export const LOAD_MODSUBMODS_SUCCESS = 'LOAD_MODSUBMODS_SUCCESS';
export const CREATE_MODSUBMOD_SUCCESS = 'CREATE_MODSUBMOD_SUCCESS';
export const UPDATE_MODSUBMOD_SUCCESS = 'UPDATE_MODSUBMOD_SUCCESS';
export const DESTROY_MODSUBMOD_SUCCESS = 'DESTROY_MODSUBMOD_SUCCESS';

export function loadModSubmodsSuccess(modSubmods) {
  return {type: LOAD_MODSUBMODS_SUCCESS, modSubmods};
}
export function updateModSubmodSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_MODSUBMOD_SUCCESS};
}
export function createModSubmodSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_MODSUBMOD_SUCCESS, null};
}
export function destroyModSubmodSuccess() {
  toastr.success(' Eliminación exitosa.');
  return {type: DESTROY_MODSUBMOD_SUCCESS};
}

export function loadModSubmods() {
  return dispatch => {
    return Api.findAll(model.modsubmod).then(modSubmods => {
      dispatch(loadModSubmodsSuccess(modSubmods.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateModSubmod(id, payload) {
  return dispatch => {
    return Api.update(model.modsubmod, id, payload).then((modSubmod) => {
      dispatch(updateModSubmodSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createModSubmod(payload) {
  return dispatch => {
    return Api.create(model.modsubmod, payload).then((modSubmod) => {
      dispatch(createModSubmodSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyModSubmod(id) {
  return dispatch => {
    return Api.destroy(model.modsubmod, id).then((modSubmod) => {
      dispatch(destroyModSubmodSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

