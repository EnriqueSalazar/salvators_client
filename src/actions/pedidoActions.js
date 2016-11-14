import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_PEDIDOS_SUCCESS = 'LOAD_PEDIDOS_SUCCESS';
export const LOAD_ONE_PEDIDO_SUCCESS = 'LOAD_ONE_PEDIDO_SUCCESS';
export const CREATE_PEDIDO_SUCCESS = 'CREATE_PEDIDO_SUCCESS';
export const UPDATE_PEDIDO_SUCCESS = 'UPDATE_PEDIDO_SUCCESS';
export const DESTROY_PEDIDO_SUCCESS = 'DESTROY_PEDIDO_SUCCESS';

export function loadPedidosSuccess(pedidos) {
  return {type: LOAD_PEDIDOS_SUCCESS, pedidos};
}
export function loadOnePedidoSuccess(pedido) {
  return {type: LOAD_ONE_PEDIDO_SUCCESS, pedido};
}
export function updatePedidoSuccess(pedido) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_PEDIDO_SUCCESS, pedido};
}
export function createPedidoSuccess(pedido) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_PEDIDO_SUCCESS, pedido};
}
export function destroyPedidoSuccess(pedido) {
  toastr.success(pedido.nombre+' Eliminación exitosa.');
  return {type: DESTROY_PEDIDO_SUCCESS, pedido:{}};
}

export function loadPedidos() {
  return dispatch => {
    return Api.findAll(model.pedidos).then(pedidos => {
      dispatch(loadPedidosSuccess(pedidos.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOnePedido(id) {
  return dispatch => {
    return Api.findOne(model.pedidos, id).then(pedido => {
      dispatch(loadOnePedidoSuccess(pedido.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updatePedido(id, payload) {
  return dispatch => {
    return Api.update(model.pedidos, id, payload).then((pedido) => {
      dispatch(updatePedidoSuccess(pedido.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createPedido(payload) {
  return dispatch => {
    return Api.create(model.pedidos, payload).then((pedido) => {
      dispatch(createPedidoSuccess(pedido.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyPedido(id) {
  return dispatch => {
    return Api.destroy(model.pedidos,id).then((pedido) => {
      dispatch(destroyPedidoSuccess(pedido.data));
    }).catch(error => {
      throw(error);
    });
  };
}

