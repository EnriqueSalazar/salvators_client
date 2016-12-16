import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_QUEJAS_SUCCESS = 'LOAD_QUEJAS_SUCCESS';
export const LOAD_ONE_QUEJA_SUCCESS = 'LOAD_ONE_QUEJA_SUCCESS';
export const CREATE_QUEJA_SUCCESS = 'CREATE_QUEJA_SUCCESS';
export const UPDATE_QUEJA_SUCCESS = 'UPDATE_QUEJA_SUCCESS';
export const DESTROY_QUEJA_SUCCESS = 'DESTROY_QUEJA_SUCCESS';

export function loadQuejasSuccess(quejas) {
  return {type: LOAD_QUEJAS_SUCCESS, quejas};
}
export function loadOneQuejaSuccess(queja) {
  return {type: LOAD_ONE_QUEJA_SUCCESS, queja};
}
export function updateQuejaSuccess(queja) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_QUEJA_SUCCESS, queja};
}
export function createQuejaSuccess(queja) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_QUEJA_SUCCESS, queja};
}
export function destroyQuejaSuccess(queja) {
  toastr.success(queja.nombre+' Eliminación exitosa.');
  return {type: DESTROY_QUEJA_SUCCESS, queja:{}};
}

export function loadQuejas() {
  return dispatch => {
    return Api.findAll(model.queja).then(quejas => {
      dispatch(loadQuejasSuccess(quejas.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneQueja(id) {
  return dispatch => {
    return Api.findOne(model.queja, id).then(queja => {
      dispatch(loadOneQuejaSuccess(queja.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateQueja(id, payload) {
  return dispatch => {
    return Api.update(model.queja, id, payload).then((queja) => {
      dispatch(updateQuejaSuccess(queja.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createQueja(payload) {
  return dispatch => {
    return Api.create(model.queja, payload).then((queja) => {
      dispatch(createQuejaSuccess(queja.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyQueja(id) {
  return dispatch => {
    return Api.destroy(model.queja,id).then((queja) => {
      dispatch(destroyQuejaSuccess(queja.data));
    }).catch(error => {
      throw(error);
    });
  };
}

