
import {
  LOAD_QUEJAS_SUCCESS,
  LOAD_ONE_QUEJA_SUCCESS,
  CREATE_QUEJA_SUCCESS,
  UPDATE_QUEJA_SUCCESS,
  DESTROY_QUEJA_SUCCESS,
} from '../actions/quejaActions';

export default function quejaReducer(state = {
  quejas: [],
  shouldUpdateQuejas: false,
  queja:{}
}, action) {
  switch (action.type) {
    case CREATE_QUEJA_SUCCESS:
    case DESTROY_QUEJA_SUCCESS:
    case UPDATE_QUEJA_SUCCESS:
      return Object.assign({}, state,
        {queja:action.queja,
          shouldUpdateQuejas: true});
    case LOAD_ONE_QUEJA_SUCCESS:
      return Object.assign({}, state,
        {queja: action.queja,
          shouldUpdateQuejas: false});
    case LOAD_QUEJAS_SUCCESS:
      return Object.assign({}, state,
        {quejas: action.quejas,
          shouldUpdateQuejas: false});
    default:
      return state;
  }
}

