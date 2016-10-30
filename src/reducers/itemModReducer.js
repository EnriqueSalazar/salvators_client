
import {
  LOAD_ITEMMODS_SUCCESS,
  LOAD_ONE_ITEMMOD_SUCCESS,
  CREATE_ITEMMOD_SUCCESS,
  UPDATE_ITEMMOD_SUCCESS,
  DESTROY_ITEMMOD_SUCCESS,
} from '../actions/itemModActions';

export default function itemModReducer(state = {
  itemMods: [],
  shouldUpdateItemMods: false,
  itemMod:{}
}, action) {
  switch (action.type) {
    case CREATE_ITEMMOD_SUCCESS:
    case DESTROY_ITEMMOD_SUCCESS:
    case UPDATE_ITEMMOD_SUCCESS:
      return Object.assign({}, state,
        {itemMod:action.itemMod,
          shouldUpdateItemMods: true});
    case LOAD_ONE_ITEMMOD_SUCCESS:
      return Object.assign({}, state,
        {itemMod: action.itemMod,
          shouldUpdateItemMods: false});
    case LOAD_ITEMMODS_SUCCESS:
      return Object.assign({}, state,
        {itemMods: action.itemMods,
          shouldUpdateItemMods: false});
    default:
      return state;
  }
}

