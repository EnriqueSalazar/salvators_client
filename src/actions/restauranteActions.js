import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_RESTAURANTES_SUCCESS = 'LOAD_RESTAURANTES_SUCCESS';
export const LOAD_ONE_RESTAURANTE_SUCCESS = 'LOAD_ONE_RESTAURANTE_SUCCESS';
export const CREATE_RESTAURANTE_SUCCESS = 'CREATE_RESTAURANTE_SUCCESS';
export const UPDATE_RESTAURANTE_SUCCESS = 'UPDATE_RESTAURANTE_SUCCESS';
export const DESTROY_RESTAURANTE_SUCCESS = 'DESTROY_RESTAURANTE_SUCCESS';

export function loadRestaurantesSuccess(restaurantes) {
  return {type: LOAD_RESTAURANTES_SUCCESS, restaurantes};
}
export function loadOneRestaurantesuccess(restaurante) {
  return {type: LOAD_ONE_RESTAURANTE_SUCCESS, restaurante};
}
export function updateRestaurantesuccess(restaurante) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_RESTAURANTE_SUCCESS, restaurante};
}
export function createRestaurantesuccess(restaurante) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_RESTAURANTE_SUCCESS, restaurante};
}
export function destroyRestaurantesuccess(restaurante) {
  toastr.success(restaurante.nombre+' Eliminación exitosa.');
  return {type: DESTROY_RESTAURANTE_SUCCESS, restaurante:{}};
}

export function loadRestaurantes() {
  return dispatch => {
    return Api.findAll(model.restaurante).then(restaurantes => {
      dispatch(loadRestaurantesSuccess(restaurantes.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneRestaurante(id) {
  return dispatch => {
    return Api.findOne(model.restaurante, id).then(restaurante => {
      dispatch(loadOneRestaurantesuccess(restaurante.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateRestaurante(id, payload) {
  return dispatch => {
    return Api.update(model.restaurante, id, payload).then((restaurante) => {
      dispatch(updateRestaurantesuccess(restaurante.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createRestaurante(payload) {
  return dispatch => {
    return Api.create(model.restaurante, payload).then((restaurante) => {
      dispatch(createRestaurantesuccess(restaurante.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyRestaurante(id) {
  return dispatch => {
    return Api.destroy(model.restaurante,id).then((restaurante) => {
      dispatch(destroyRestaurantesuccess(restaurante.data));
    }).catch(error => {
      throw(error);
    });
  };
}

