
import {
  LOAD_CANCELACIONES_SUCCESS,
  LOAD_ONE_CANCELACION_SUCCESS,
  CREATE_CANCELACION_SUCCESS,
  UPDATE_CANCELACION_SUCCESS,
  DESTROY_CANCELACION_SUCCESS,
} from '../actions/cancelacionActions';

export default function cancelacionReducer(state = {
  cancelaciones: [],
  shouldUpdateCancelaciones: false,
  cancelacion:{}
}, action) {
  switch (action.type) {
    case CREATE_CANCELACION_SUCCESS:
    case DESTROY_CANCELACION_SUCCESS:
    case UPDATE_CANCELACION_SUCCESS:
      return Object.assign({}, state,
        {cancelacion:action.cancelacion,
          shouldUpdateCancelaciones: true});
    case LOAD_ONE_CANCELACION_SUCCESS:
      return Object.assign({}, state,
        {cancelacion: action.cancelacion,
          shouldUpdateCancelaciones: false});
    case LOAD_CANCELACIONES_SUCCESS:
      return Object.assign({}, state,
        {cancelaciones: action.cancelaciones,
          shouldUpdateCancelaciones: false});
    default:
      return state;
  }
}

