
import {
  LOAD_FORMASPAGO_SUCCESS,
  CREATE_FORMAPAGO_SUCCESS,
  UPDATE_FORMAPAGO_SUCCESS,
  DESTROY_FORMAPAGO_SUCCESS,
} from '../actions/formaPagoActions';

export default function formaPagoReducer(state = {
  formasPago: [],
  shouldUpdateFormasPago: false,
  formaPago:{}
}, action) {
  switch (action.type) {
    case CREATE_FORMAPAGO_SUCCESS:
    case DESTROY_FORMAPAGO_SUCCESS:
    case UPDATE_FORMAPAGO_SUCCESS:
      return Object.assign({}, state,
        {formaPago:action.formaPago,
          shouldUpdateFormasPago: true});
    case LOAD_FORMASPAGO_SUCCESS:
      return Object.assign({}, state,
        {formasPago: action.formasPago,
          shouldUpdateFormasPago: false});
    default:
      return state;
  }
}

