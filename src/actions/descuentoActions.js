import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_DESCUENTOS_SUCCESS = 'LOAD_DESCUENTOS_SUCCESS';
export const LOAD_ONE_DESCUENTO_SUCCESS = 'LOAD_ONE_DESCUENTO_SUCCESS';
export const CREATE_DESCUENTO_SUCCESS = 'CREATE_DESCUENTO_SUCCESS';
export const UPDATE_DESCUENTO_SUCCESS = 'UPDATE_DESCUENTO_SUCCESS';
export const DESTROY_DESCUENTO_SUCCESS = 'DESTROY_DESCUENTO_SUCCESS';

export function loadDescuentosSuccess(descuentos) {
  return {type: LOAD_DESCUENTOS_SUCCESS, descuentos};
}
export function loadOneDescuentosuccess(descuento) {
  return {type: LOAD_ONE_DESCUENTO_SUCCESS, descuento};
}
export function updateDescuentosuccess(descuento) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_DESCUENTO_SUCCESS, descuento};
}
export function createDescuentosuccess(descuento) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_DESCUENTO_SUCCESS, descuento};
}
export function destroyDescuentosuccess(descuento) {
  toastr.success(descuento.nombre+' Eliminación exitosa.');
  return {type: DESTROY_DESCUENTO_SUCCESS, descuento:{}};
}

export function loadDescuentos() {
  return dispatch => {
    return Api.findAll(model.descuento).then(descuentos => {
      dispatch(loadDescuentosSuccess(descuentos.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneDescuento(id) {
  return dispatch => {
    return Api.findOne(model.descuento, id).then(descuento => {
      dispatch(loadOneDescuentosuccess(descuento.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateDescuento(id, payload) {
  return dispatch => {
    return Api.update(model.descuento, id, payload).then((descuento) => {
      dispatch(updateDescuentosuccess(descuento.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createDescuento(payload) {
  return dispatch => {
    return Api.create(model.descuento, payload).then((descuento) => {
      dispatch(createDescuentosuccess(descuento.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyDescuento(id) {
  return dispatch => {
    return Api.destroy(model.descuento,id).then((descuento) => {
      dispatch(destroyDescuentosuccess(descuento.data));
    }).catch(error => {
      throw(error);
    });
  };
}

