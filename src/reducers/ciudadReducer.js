
import {
  LOAD_CIUDADES_SUCCESS,
  LOAD_ONE_CIUDAD_SUCCESS,
  CREATE_CIUDAD_SUCCESS,
  UPDATE_CIUDAD_SUCCESS,
  DESTROY_CIUDAD_SUCCESS,
} from '../actions/ciudadActions';

export default function ciudadReducer(state = {
  ciudades: [],
  shouldUpdateCiudades: false,
  ciudad:{}
}, action) {
  switch (action.type) {
    case CREATE_CIUDAD_SUCCESS:
    case DESTROY_CIUDAD_SUCCESS:
    case UPDATE_CIUDAD_SUCCESS:
      return Object.assign({}, state,
        {ciudad:action.ciudad,
          shouldUpdateCiudades: true});
    case LOAD_ONE_CIUDAD_SUCCESS:
      return Object.assign({}, state,
        {ciudad: action.ciudad,
          shouldUpdateCiudades: false});
    case LOAD_CIUDADES_SUCCESS:
      return Object.assign({}, state,
        {ciudades: action.ciudades,
          shouldUpdateCiudades: false});
    default:
      return state;
  }
}

