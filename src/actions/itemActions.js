import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'
import { browserHistory } from 'react-router';

export const LOAD_ITEMS_SUCCESS = 'LOAD_ITEMS_SUCCESS';
export const LOAD_ONE_ITEM_SUCCESS = 'LOAD_ONE_ITEM_SUCCESS';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const DESTROY_ITEM_SUCCESS = 'DESTROY_ITEM_SUCCESS';

export function loadItemsSuccess(items) {
  return {type: LOAD_ITEMS_SUCCESS, items};
}
export function loadOneItemSuccess(item) {
  return {type: LOAD_ONE_ITEM_SUCCESS, item};
}
export function updateItemSuccess(item) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_ITEM_SUCCESS, item};
}
export function createItemSuccess(item) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_ITEM_SUCCESS, item};
}
export function destroyItemSuccess(item) {
  toastr.success(item.nombre+' Eliminación exitosa.');
  return {type: DESTROY_ITEM_SUCCESS, item:{}};
}

export function loadItems() {
  return dispatch => {
    return Api.findAll(model.itemmenu).then(items => {
      dispatch(loadItemsSuccess(items.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneItem(id) {
  return dispatch => {
    return Api.findOne(model.itemmenu, id).then(item => {
      dispatch(loadOneItemSuccess(item.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateItem(id, payload) {
  return dispatch => {
    return Api.update(model.itemmenu, id, payload).then((item) => {
      dispatch(updateItemSuccess(item.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createItem(payload) {
  return dispatch => {
    return Api.create(model.itemmenu, payload).then((item) => {
      browserHistory.push('/backend/edititems/0');
      dispatch(createItemSuccess(item.data));

    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyItem(id) {
  return dispatch => {
    return Api.destroy(model.itemmenu,id).then((item) => {
      dispatch(destroyItemSuccess(item.data));
    }).catch(error => {
      throw(error);
    });
  };
}

