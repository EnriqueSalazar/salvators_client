
import {
  LOAD_CLIENTES_SUCCESS,
  LOAD_ONE_CLIENTE_SUCCESS,
  CREATE_CLIENTE_SUCCESS,
  UPDATE_CLIENTE_SUCCESS,
  DESTROY_CLIENTE_SUCCESS,
} from '../actions/clienteActions';

export default function clienteReducer(state = {
  clientes: [],
  shouldUpdateClientes: false,
  cliente:{}
}, action) {
  switch (action.type) {
    case CREATE_CLIENTE_SUCCESS:
    case DESTROY_CLIENTE_SUCCESS:
    case UPDATE_CLIENTE_SUCCESS:
      return Object.assign({}, state,
        {cliente:action.cliente,
          shouldUpdateClientes: true});
    case LOAD_ONE_CLIENTE_SUCCESS:
      return Object.assign({}, state,
        {cliente: action.cliente,
          shouldUpdateClientes: false});
    case LOAD_CLIENTES_SUCCESS:
      return Object.assign({}, state,
        {clientes: action.clientes,
          shouldUpdateClientes: false});
    default:
      return state;
  }
}

