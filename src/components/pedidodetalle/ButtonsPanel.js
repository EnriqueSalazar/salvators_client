import React, { Component, PropTypes } from 'react';
import ButtonItem from './ButtonItem';

let ButtonsPanel = props => {
  return (
    <div>
      {props.list.map((button, i) => {
        let isActive = false;
        if (Array.isArray(props.selectedId)) {
          isActive = props.selectedId.includes(button.id);
        } else {
          isActive = button.id == props.selectedId;
        }
        const buttonText = (
          <span>
            {button.nombre}<br />
            {(button.precio?('$'+button.precio):'')}
      </span>
        );
        return (
          <ButtonItem
            key={i}
            nombre={buttonText}
            id={button.id}
            onClick={props.onClick}
            active={isActive}
            bsStyle={isActive ? props.activeStyle : props.bsStyle}
            isDisabled={props.isDisabled}
          />
        )
      })}
    </div>
  )
}

ButtonsPanel.propTypes = {};

export default ButtonsPanel;
