import {toastr} from 'react-redux-toastr';
import Api from '../api/Api';
import {model} from '../config/'

export const LOAD_CLIENTES_SUCCESS = 'LOAD_CLIENTES_SUCCESS';
export const LOAD_ONE_CLIENTE_SUCCESS = 'LOAD_ONE_CLIENTE_SUCCESS';
export const CREATE_CLIENTE_SUCCESS = 'CREATE_CLIENTE_SUCCESS';
export const UPDATE_CLIENTE_SUCCESS = 'UPDATE_CLIENTE_SUCCESS';
export const DESTROY_CLIENTE_SUCCESS = 'DESTROY_CLIENTE_SUCCESS';

export function loadClientesSuccess(clientes) {
  return {type: LOAD_CLIENTES_SUCCESS, clientes};
}
export function loadOneClienteSuccess(cliente) {
  return {type: LOAD_ONE_CLIENTE_SUCCESS, cliente};
}
export function updateClienteSuccess(cliente) {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_CLIENTE_SUCCESS, cliente};
}
export function createClienteSuccess(cliente) {
  toastr.success('Creación exitosa.');
  return {type: CREATE_CLIENTE_SUCCESS, cliente};
}
export function destroyClienteSuccess(cliente) {
  toastr.success(cliente.nombre+' Eliminación exitosa.');
  return {type: DESTROY_CLIENTE_SUCCESS, cliente:{}};
}

export function loadClientes() {
  return dispatch => {
    return Api.findAll(model.cliente).then(clientes => {
      dispatch(loadClientesSuccess(clientes.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneCliente(id) {
  return dispatch => {
    return Api.findOne(model.cliente, id).then(cliente => {
      dispatch(loadOneClienteSuccess(cliente.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateCliente(id, payload) {
  return dispatch => {
    return Api.update(model.cliente, id, payload).then((cliente) => {
      dispatch(updateClienteSuccess(cliente.data));
    }).catch(error => {
      throw(error);
    });
  };
}
export function createCliente(payload) {
  return dispatch => {
    return Api.create(model.cliente, payload).then((cliente) => {
      dispatch(createClienteSuccess(cliente.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyCliente(id) {
  debugger
  return dispatch => {
    return Api.destroy(model.cliente,id).then((cliente) => {
      dispatch(destroyClienteSuccess(cliente.data));
    }).catch(error => {
      throw(error);
    });
  };
}

