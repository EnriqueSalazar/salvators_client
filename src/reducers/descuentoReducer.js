
import {
  LOAD_DESCUENTOS_SUCCESS,
  CREATE_DESCUENTO_SUCCESS,
  UPDATE_DESCUENTO_SUCCESS,
  DESTROY_DESCUENTO_SUCCESS,
} from '../actions/descuentoActions';

export default function descuentoReducer(state = {
  descuentos: [],
  shouldUpdateDescuentos: false,
  descuento:{}
}, action) {
  switch (action.type) {
    case CREATE_DESCUENTO_SUCCESS:
    case DESTROY_DESCUENTO_SUCCESS:
    case UPDATE_DESCUENTO_SUCCESS:
      return Object.assign({}, state,
        {descuento:action.descuento,
          shouldUpdateDescuentos: true});
    case LOAD_DESCUENTOS_SUCCESS:
      return Object.assign({}, state,
        {descuentos: action.descuentos,
          shouldUpdateDescuentos: false});
    default:
      return state;
  }
}

