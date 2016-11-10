import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_PEDIDOITEMS_SUCCESS = 'LOAD_PEDIDOITEMS_SUCCESS';
export const LOAD_ONE_PEDIDOITEM_SUCCESS = 'LOAD_ONE_PEDIDOITEM_SUCCESS';
export const CREATE_PEDIDOITEM_SUCCESS = 'CREATE_PEDIDOITEM_SUCCESS';
export const UPDATE_PEDIDOITEM_SUCCESS = 'UPDATE_PEDIDOITEM_SUCCESS';
export const DESTROY_PEDIDOITEM_SUCCESS = 'DESTROY_PEDIDOITEM_SUCCESS';

export function loadPedidoItemsSuccess(pedidoItems) {
  return {type: LOAD_PEDIDOITEMS_SUCCESS, pedidoItems};
}
export function loadOnePedidoItemSuccess(pedidoItem) {
  return {type: LOAD_ONE_PEDIDOITEM_SUCCESS, pedidoItem};
}
export function updatePedidoItemSuccess(pedidoItem) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_PEDIDOITEM_SUCCESS, pedidoItem};
}
export function createPedidoItemSuccess(pedidoItem) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_PEDIDOITEM_SUCCESS, pedidoItem};
}
export function destroyPedidoItemSuccess(pedidoItem) {
  toastr.success(pedidoItem.nombre+' Eliminación exitosa.');
  return {type: DESTROY_PEDIDOITEM_SUCCESS, pedidoItem:{}};
}

export function loadPedidoItems() {
  return dispatch => {
    return Api.findAll(model.pedidoitem).then(pedidoItems => {
      dispatch(loadPedidoItemsSuccess(pedidoItems.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOnePedidoItem(id) {
  return dispatch => {
    return Api.findOne(model.pedidoitem, id).then(pedidoItem => {
      dispatch(loadOnePedidoItemSuccess(pedidoItem.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updatePedidoItem(id, payload) {
  return dispatch => {
    return Api.update(model.pedidoitem, id, payload).then((pedidoItem) => {
      dispatch(updatePedidoItemSuccess(pedidoItem.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createPedidoItem(payload) {
  return dispatch => {
    return Api.create(model.pedidoitem, payload).then((pedidoItem) => {
      dispatch(createPedidoItemSuccess(pedidoItem.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyPedidoItem(id) {
  return dispatch => {
    return Api.destroy(model.pedidoitem,id).then((pedidoItem) => {
      dispatch(destroyPedidoItemSuccess(pedidoItem.data));
    }).catch(error => {
      throw(error);
    });
  };
}

