import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_PEDIDOITEMPARTES_SUCCESS = 'LOAD_PEDIDOITEMPARTES_SUCCESS';
export const LOAD_ONE_PEDIDOITEMPARTE_SUCCESS = 'LOAD_ONE_PEDIDOITEMPARTE_SUCCESS';
export const CREATE_PEDIDOITEMPARTE_SUCCESS = 'CREATE_PEDIDOITEMPARTE_SUCCESS';
export const UPDATE_PEDIDOITEMPARTE_SUCCESS = 'UPDATE_PEDIDOITEMPARTE_SUCCESS';
export const DESTROY_PEDIDOITEMPARTE_SUCCESS = 'DESTROY_PEDIDOITEMPARTE_SUCCESS';

export function loadPedidoItemPartesSuccess(pedidoItemPartes) {
  return {type: LOAD_PEDIDOITEMPARTES_SUCCESS, pedidoItemPartes};
}
export function loadOnePedidoItemParteSuccess(pedidoItemParte) {
  return {type: LOAD_ONE_PEDIDOITEMPARTE_SUCCESS, pedidoItemParte};
}
export function updatePedidoItemParteSuccess(pedidoItemParte) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_PEDIDOITEMPARTE_SUCCESS, pedidoItemParte};
}
export function createPedidoItemParteSuccess(pedidoItemParte) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_PEDIDOITEMPARTE_SUCCESS, pedidoItemParte};
}
export function destroyPedidoItemParteSuccess(pedidoItemParte) {
  toastr.success(pedidoItemParte.nombre+' Eliminación exitosa.');
  return {type: DESTROY_PEDIDOITEMPARTE_SUCCESS, pedidoItemParte:{}};
}

export function loadPedidoItemPartes() {
  return dispatch => {
    return Api.findAll(model.pedidoitemparte).then(pedidoItemPartes => {
      dispatch(loadPedidoItemPartesSuccess(pedidoItemPartes.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOnePedidoItemParte(id) {
  return dispatch => {
    return Api.findOne(model.pedidoitemparte, id).then(pedidoItemParte => {
      dispatch(loadOnePedidoItemParteSuccess(pedidoItemParte.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updatePedidoItemParte(id, payload) {
  return dispatch => {
    return Api.update(model.pedidoitemparte, id, payload).then((pedidoItemParte) => {
      dispatch(updatePedidoItemParteSuccess(pedidoItemParte.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createPedidoItemParte(payload) {
  return dispatch => {
    return Api.create(model.pedidoitemparte, payload).then((pedidoItemParte) => {
      dispatch(createPedidoItemParteSuccess(pedidoItemParte.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyPedidoItemParte(id) {
  return dispatch => {
    return Api.destroy(model.pedidoitemparte,id).then((pedidoItemParte) => {
      dispatch(destroyPedidoItemParteSuccess(pedidoItemParte.data));
    }).catch(error => {
      throw(error);
    });
  };
}

