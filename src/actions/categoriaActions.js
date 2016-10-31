import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_CATEGORIAS_SUCCESS = 'LOAD_CATEGORIAS_SUCCESS';
export const LOAD_ONE_CATEGORIA_SUCCESS = 'LOAD_ONE_CATEGORIA_SUCCESS';
export const CREATE_CATEGORIA_SUCCESS = 'CREATE_CATEGORIA_SUCCESS';
export const UPDATE_CATEGORIA_SUCCESS = 'UPDATE_CATEGORIA_SUCCESS';
export const DESTROY_CATEGORIA_SUCCESS = 'DESTROY_CATEGORIA_SUCCESS';

export function loadCategoriasSuccess(categorias) {
  return {type: LOAD_CATEGORIAS_SUCCESS, categorias};
}
export function loadOneCategoriaSuccess(categoria) {
  return {type: LOAD_ONE_CATEGORIA_SUCCESS, categoria};
}
export function updateCategoriaSuccess(categoria) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_CATEGORIA_SUCCESS, categoria};
}
export function createCategoriaSuccess(categoria) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_CATEGORIA_SUCCESS, categoria};
}
export function destroyCategoriaSuccess(categoria) {
  toastr.success(categoria.nombre+' Eliminación exitosa.');
  return {type: DESTROY_CATEGORIA_SUCCESS, categoria:{}};
}

export function loadCategorias() {
  return dispatch => {
    return Api.findAll(model.categoriamenu).then(categorias => {
      dispatch(loadCategoriasSuccess(categorias.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneCategoria(id) {
  return dispatch => {
    return Api.findOne(model.categoriamenu, id).then(categoria => {
      dispatch(loadOneCategoriaSuccess(categoria.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateCategoria(id, payload) {
  debugger
  return dispatch => {
    return Api.update(model.categoriamenu, id, payload).then((categoria) => {
      debugger
      dispatch(updateCategoriaSuccess(categoria.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createCategoria(payload) {
  debugger
  return dispatch => {
    return Api.create(model.categoriamenu, payload).then((categoria) => {
      debugger
      dispatch(createCategoriaSuccess(categoria.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyCategoria(id) {
  return dispatch => {
    return Api.destroy(model.categoriamenu,id).then((categoria) => {
      dispatch(destroyCategoriaSuccess(categoria.data));
    }).catch(error => {
      throw(error);
    });
  };
}

