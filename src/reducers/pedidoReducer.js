
import {
  LOAD_PEDIDOS_SUCCESS,
  LOAD_ONE_PEDIDO_SUCCESS,
  CREATE_PEDIDO_SUCCESS,
  UPDATE_PEDIDO_SUCCESS,
  DESTROY_PEDIDO_SUCCESS,
} from '../actions/pedidoActions';

export default function pedidoReducer(state = {
  pedidos: [],
  shouldUpdatePedidos: false,
  pedido:{}
}, action) {
  switch (action.type) {
    case CREATE_PEDIDO_SUCCESS:
    case DESTROY_PEDIDO_SUCCESS:
    case UPDATE_PEDIDO_SUCCESS:
      return Object.assign({}, state,
        {pedido:action.pedido,
          shouldUpdatePedidos: true});
    case LOAD_ONE_PEDIDO_SUCCESS:
      return Object.assign({}, state,
        {pedido: action.pedido,
          shouldUpdatePedidos: false});
    case LOAD_PEDIDOS_SUCCESS:
      return Object.assign({}, state,
        {pedidos: action.pedidos,
          shouldUpdatePedidos: false});
    default:
      return state;
  }
}

