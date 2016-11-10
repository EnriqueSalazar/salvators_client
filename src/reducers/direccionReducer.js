
import {
  LOAD_DIRECCIONES_SUCCESS,
  LOAD_ONE_DIRECCION_SUCCESS,
  CREATE_DIRECCION_SUCCESS,
  UPDATE_DIRECCION_SUCCESS,
  DESTROY_DIRECCION_SUCCESS,
} from '../actions/direccionActions';

export default function direccionReducer(state = {
  direcciones: [],
  shouldUpdateDirecciones: false,
  direccion:{}
}, action) {
  switch (action.type) {
    case CREATE_DIRECCION_SUCCESS:
    case DESTROY_DIRECCION_SUCCESS:
    case UPDATE_DIRECCION_SUCCESS:
      return Object.assign({}, state,
        {direccion:action.direccion,
          shouldUpdateDirecciones: true});
    case LOAD_ONE_DIRECCION_SUCCESS:
      return Object.assign({}, state,
        {direccion: action.direccion,
          shouldUpdateDirecciones: false});
    case LOAD_DIRECCIONES_SUCCESS:
      return Object.assign({}, state,
        {direcciones: action.direcciones,
          shouldUpdateDirecciones: false});
    default:
      return state;
  }
}

