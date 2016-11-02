
import {
  LOAD_DIRECCIONS_SUCCESS,
  LOAD_ONE_DIRECCION_SUCCESS,
  CREATE_DIRECCION_SUCCESS,
  UPDATE_DIRECCION_SUCCESS,
  DESTROY_DIRECCION_SUCCESS,
} from '../actions/direccionActions';

export default function direccionReducer(state = {
  direccions: [],
  shouldUpdateDireccions: false,
  direccion:{}
}, action) {
  switch (action.type) {
    case CREATE_DIRECCION_SUCCESS:
    case DESTROY_DIRECCION_SUCCESS:
    case UPDATE_DIRECCION_SUCCESS:
      return Object.assign({}, state,
        {direccion:action.direccion,
          shouldUpdateDireccions: true});
    case LOAD_ONE_DIRECCION_SUCCESS:
      return Object.assign({}, state,
        {direccion: action.direccion,
          shouldUpdateDireccions: false});
    case LOAD_DIRECCIONS_SUCCESS:
      return Object.assign({}, state,
        {direccions: action.direccions,
          shouldUpdateDireccions: false});
    default:
      return state;
  }
}

