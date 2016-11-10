
import {
  LOAD_PEDIDOITEMPARTES_SUCCESS,
  LOAD_ONE_PEDIDOITEMPARTE_SUCCESS,
  CREATE_PEDIDOITEMPARTE_SUCCESS,
  UPDATE_PEDIDOITEMPARTE_SUCCESS,
  DESTROY_PEDIDOITEMPARTE_SUCCESS,
} from '../actions/pedidoItemParteActions';

export default function pedidoItemParteReducer(state = {
  pedidoItemPartes: [],
  shouldUpdatePedidoItemPartes: false,
  pedidoItemParte:{}
}, action) {
  switch (action.type) {
    case CREATE_PEDIDOITEMPARTE_SUCCESS:
    case DESTROY_PEDIDOITEMPARTE_SUCCESS:
    case UPDATE_PEDIDOITEMPARTE_SUCCESS:
      return Object.assign({}, state,
        {pedidoItemParte:action.pedidoItemParte,
          shouldUpdatePedidoItemPartes: true});
    case LOAD_ONE_PEDIDOITEMPARTE_SUCCESS:
      return Object.assign({}, state,
        {pedidoItemParte: action.pedidoItemParte,
          shouldUpdatePedidoItemPartes: false});
    case LOAD_PEDIDOITEMPARTES_SUCCESS:
      return Object.assign({}, state,
        {pedidoItemPartes: action.pedidoItemPartes,
          shouldUpdatePedidoItemPartes: false});
    default:
      return state;
  }
}

