import React, { Component, PropTypes } from 'react';
import ButtonItem from './ButtonItem';

let ButtonsPanel = props => {
  return (
    <div>
      {props.list.map((button, i) => {
        let isActive = button.id == props.selectedId;
        return (
          <ButtonItem
            key={i}
            nombre={button.nombre}
            id={button.id}
            onClick={props.onClick}
            active={isActive}
            bsStyle={isActive ? props.activeStyle : props.bsStyle}
          />
        )
      })}
    </div>
  )
}

ButtonsPanel.propTypes = {};

export default ButtonsPanel;
