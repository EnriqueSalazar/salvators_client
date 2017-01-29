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
          width: '10em',
          height: '5em',
        }}

        active={props.active}
        bsStyle={props.bsStyle}
        disabled={props.isDisabled}
      >
        {props.nombre}
      </Button>
    </span>
  )

}

ButtonItem.propTypes = {};

export default ButtonItem;
