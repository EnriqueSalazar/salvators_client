
import {
  LOAD_CATEGORIAS_SUCCESS,
  LOAD_ONE_CATEGORIA_SUCCESS,
  CREATE_CATEGORIA_SUCCESS,
  UPDATE_CATEGORIA_SUCCESS,
  DESTROY_CATEGORIA_SUCCESS,
} from '../actions/categoriaActions';

export default function categoriaReducer(state = {
  categorias: [],
  shouldUpdateCategorias: false,
  categoria:{}
}, action) {
  switch (action.type) {
    case CREATE_CATEGORIA_SUCCESS:
    case DESTROY_CATEGORIA_SUCCESS:
    case UPDATE_CATEGORIA_SUCCESS:
      return Object.assign({}, state,
        {categoria:action.categoria,
          shouldUpdateCategorias: true});
    case LOAD_ONE_CATEGORIA_SUCCESS:
      return Object.assign({}, state,
        {categoria: action.categoria,
          shouldUpdateCategorias: false});
    case LOAD_CATEGORIAS_SUCCESS:
      return Object.assign({}, state,
        {categorias: action.categorias,
          shouldUpdateCategorias: false});
    default:
      return state;
  }
}

