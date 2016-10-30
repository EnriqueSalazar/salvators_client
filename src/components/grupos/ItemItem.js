import React, {Component, PropTypes} from 'react';
import {ItemTypes} from './Constants';
import {DragSource} from 'react-dnd';
import {Label} from 'react-bootstrap';

const itemSource = {
  beginDrag(props){
    return {id: props.data.id};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}
class ItemItem extends Component {
  constructor(props) {
    super(props);
  }


  render = ()=> {
    const {connectDragSource} = this.props;
    return connectDragSource(
      <div><h43><Label>{this.props.value}</Label></h43></div>
    );
  }
}


ItemItem.propTypes = {};
export default DragSource(ItemTypes.ITEM, itemSource, collect)(ItemItem);
