
import {
  LOAD_ESTADOS_SUCCESS,
  LOAD_ONE_ESTADO_SUCCESS,
  CREATE_ESTADO_SUCCESS,
  UPDATE_ESTADO_SUCCESS,
  DESTROY_ESTADO_SUCCESS,
} from '../actions/estadoActions';

export default function estadoReducer(state = {
  estados: [],
  shouldUpdateEstados: false,
  estado:{}
}, action) {
  switch (action.type) {
    case CREATE_ESTADO_SUCCESS:
    case DESTROY_ESTADO_SUCCESS:
    case UPDATE_ESTADO_SUCCESS:
      return Object.assign({}, state,
        {estado:action.estado,
          shouldUpdateEstados: true});
    case LOAD_ONE_ESTADO_SUCCESS:
      return Object.assign({}, state,
        {estado: action.estado,
          shouldUpdateEstados: false});
    case LOAD_ESTADOS_SUCCESS:
      return Object.assign({}, state,
        {estados: action.estados,
          shouldUpdateEstados: false});
    default:
      return state;
  }
}

