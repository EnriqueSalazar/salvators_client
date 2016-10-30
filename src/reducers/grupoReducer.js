
import {
  LOAD_GRUPOS_SUCCESS,
  LOAD_ONE_GRUPO_SUCCESS,
  CREATE_GRUPO_SUCCESS,
  UPDATE_GRUPO_SUCCESS,
  DESTROY_GRUPO_SUCCESS,
} from '../actions/grupoActions';

export default function grupoReducer(state = {
  grupos: [],
  shouldUpdateGrupos: false,
  grupo:{}
}, action) {
  switch (action.type) {
    case CREATE_GRUPO_SUCCESS:
    case DESTROY_GRUPO_SUCCESS:
    case UPDATE_GRUPO_SUCCESS:
      return Object.assign({}, state,
        {grupo:action.grupo,
          shouldUpdateGrupos: true});
    case LOAD_ONE_GRUPO_SUCCESS:
      return Object.assign({}, state,
        {grupo: action.grupo,
          shouldUpdateGrupos: false});
    case LOAD_GRUPOS_SUCCESS:
      return Object.assign({}, state,
        {grupos: action.grupos,
          shouldUpdateGrupos: false});
    default:
      return state;
  }
}

