
import {
  LOAD_ITEMS_SUCCESS,
  LOAD_ONE_ITEM_SUCCESS,
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DESTROY_ITEM_SUCCESS,
} from '../actions/itemActions';

export default function itemReducer(state = {
  items: [],
  shouldUpdateItems: false,
  item:{}
}, action) {
  switch (action.type) {
    case CREATE_ITEM_SUCCESS:
    case DESTROY_ITEM_SUCCESS:
    case UPDATE_ITEM_SUCCESS:
      return Object.assign({}, state,
        {item:action.item,
          shouldUpdateItems: true});
    case LOAD_ONE_ITEM_SUCCESS:
      return Object.assign({}, state,
        {item: action.item,
          shouldUpdateItems: false});
    case LOAD_ITEMS_SUCCESS:
      return Object.assign({}, state,
        {items: action.items,
          shouldUpdateItems: false});
    default:
      return state;
  }
}

