
import {
  LOAD_PEDIDOITEMS_SUCCESS,
  LOAD_ONE_PEDIDOITEM_SUCCESS,
  CREATE_PEDIDOITEM_SUCCESS,
  UPDATE_PEDIDOITEM_SUCCESS,
  DESTROY_PEDIDOITEM_SUCCESS,
} from '../actions/pedidoItemActions';

export default function pedidoItemReducer(state = {
  pedidoItems: [],
  shouldUpdatePedidoItems: false,
  pedidoItem:{}
}, action) {
  switch (action.type) {
    case CREATE_PEDIDOITEM_SUCCESS:
    case DESTROY_PEDIDOITEM_SUCCESS:
    case UPDATE_PEDIDOITEM_SUCCESS:
      return Object.assign({}, state,
        {pedidoItem:action.pedidoItem,
          shouldUpdatePedidoItems: true});
    case LOAD_ONE_PEDIDOITEM_SUCCESS:
      return Object.assign({}, state,
        {pedidoItem: action.pedidoItem,
          shouldUpdatePedidoItems: false});
    case LOAD_PEDIDOITEMS_SUCCESS:
      return Object.assign({}, state,
        {pedidoItems: action.pedidoItems,
          shouldUpdatePedidoItems: false});
    default:
      return state;
  }
}

