
import {
  LOAD_DOMICILIARIOS_SUCCESS,
  CREATE_DOMICILIARIO_SUCCESS,
  UPDATE_DOMICILIARIO_SUCCESS,
  DESTROY_DOMICILIARIO_SUCCESS,
} from '../actions/domiciliarioActions';

export default function domiciliarioReducer(state = {
  domiciliarios: [],
  shouldUpdateDomiciliarios: false,
  domiciliario:{}
}, action) {
  switch (action.type) {
    case CREATE_DOMICILIARIO_SUCCESS:
    case DESTROY_DOMICILIARIO_SUCCESS:
    case UPDATE_DOMICILIARIO_SUCCESS:
      return Object.assign({}, state,
        {domiciliario:action.domiciliario,
          shouldUpdateDomiciliarios: true});
    case LOAD_DOMICILIARIOS_SUCCESS:
      return Object.assign({}, state,
        {domiciliarios: action.domiciliarios,
          shouldUpdateDomiciliarios: false});
    default:
      return state;
  }
}

