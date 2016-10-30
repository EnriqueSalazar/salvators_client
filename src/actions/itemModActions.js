import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../../cfg/'

export const LOAD_ITEMMODS_SUCCESS = 'LOAD_ITEMMODS_SUCCESS';
export const LOAD_ONE_ITEMMOD_SUCCESS = 'LOAD_ONE_ITEMMOD_SUCCESS';
export const CREATE_ITEMMOD_SUCCESS = 'CREATE_ITEMMOD_SUCCESS';
export const UPDATE_ITEMMOD_SUCCESS = 'UPDATE_ITEMMOD_SUCCESS';
export const DESTROY_ITEMMOD_SUCCESS = 'DESTROY_ITEMMOD_SUCCESS';

export function loadItemModsSuccess(itemMods) {
  return {type: LOAD_ITEMMODS_SUCCESS, itemMods};
}
export function loadOneItemModSuccess(itemMod) {
  return {type: LOAD_ONE_ITEMMOD_SUCCESS, itemMod};
}
export function updateItemModSuccess(itemMod) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_ITEMMOD_SUCCESS, itemMod};
}
export function createItemModSuccess(itemMod) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_ITEMMOD_SUCCESS, itemMod};
}
export function destroyItemModSuccess(itemMod) {
  toastr.success(itemMod.nombre+' Eliminación exitosa.');
  return {type: DESTROY_ITEMMOD_SUCCESS, itemMod:{}};
}

export function loadItemMods() {
  return dispatch => {
    return Api.findAll(model.itemmod).then(itemMods => {
      dispatch(loadItemModsSuccess(itemMods.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneItemMod(id) {
  return dispatch => {
    return Api.findOne(model.itemmod, id).then(itemMod => {
      dispatch(loadOneItemModSuccess(itemMod.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateItemMod(id, payload) {
  return dispatch => {
    return Api.update(model.itemmod, id, payload).then((itemMod) => {
      dispatch(updateItemModSuccess(itemMod.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createItemMod(payload) {
  return dispatch => {
    return Api.create(model.itemmod, payload).then((itemMod) => {
      dispatch(createItemModSuccess(itemMod.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyItemMod(id) {
  return dispatch => {
    return Api.destroy(model.itemmod,id).then((itemMod) => {
      dispatch(destroyItemModSuccess(itemMod.data));
    }).catch(error => {
      throw(error);
    });
  };
}

