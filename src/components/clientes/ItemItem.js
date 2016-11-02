import React, {Component, PropTypes} from 'react';
import {Label} from 'react-bootstrap';

class ItemItem extends Component {
  constructor(props) {
    super(props);
  }


  render = ()=> {
    return (
      <div><h43><Label>{this.props.value}</Label></h43></div>
    );
  }
}


ItemItem.propTypes = {};
export default ItemItem;
