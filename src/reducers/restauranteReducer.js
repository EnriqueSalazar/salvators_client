
import {
  LOAD_RESTAURANTES_SUCCESS,
  CREATE_RESTAURANTE_SUCCESS,
  UPDATE_RESTAURANTE_SUCCESS,
  DESTROY_RESTAURANTE_SUCCESS,
} from '../actions/restauranteActions';

export default function restauranteReducer(state = {
  restaurantes: [],
  shouldUpdateRestaurantes: false,
  restaurante:{}
}, action) {
  switch (action.type) {
    case CREATE_RESTAURANTE_SUCCESS:
    case DESTROY_RESTAURANTE_SUCCESS:
    case UPDATE_RESTAURANTE_SUCCESS:
      return Object.assign({}, state,
        {restaurante:action.restaurante,
          shouldUpdateRestaurantes: true});
    case LOAD_RESTAURANTES_SUCCESS:
      return Object.assign({}, state,
        {restaurantes: action.restaurantes,
          shouldUpdateRestaurantes: false});
    default:
      return state;
  }
}

