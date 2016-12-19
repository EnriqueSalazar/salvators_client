import React, { Component, PropTypes } from 'react';
import {
  Button,
} from 'react-bootstrap';

let ButtonItem = props => {

  return (
    <span>
      <Button
        onClick={() => props.onClick(props.id)}
        style={{
          whiteSpace: 'normal',
          width: '12em',
          height: '6em',
        }}
        active={props.active}
        bsStyle={props.bsStyle}
      >
        {props.nombre}
      </Button>
    </span>
  )

}

ButtonItem.propTypes = {};

export default ButtonItem;
