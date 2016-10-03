import React, {Component, PropTypes} from 'react';
import {ItemTypes} from './Constants';
import {DragSource} from 'react-dnd';
import {Label} from 'react-bootstrap';

const submodSource = {
  beginDrag(props){
    return {id: props.data.id};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}
class SubmodificadorItem extends Component {
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


SubmodificadorItem.propTypes = {};
export default DragSource(ItemTypes.SUBMOD, submodSource, collect)(SubmodificadorItem);
