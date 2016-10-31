/**
 * Created by enriq on 28/09/16.
 */
import React from 'react';
import {
  ControlLabel, FormControl, FormGroup
} from 'react-bootstrap';

const SelectField = (props) => {
  return (
    <div>
      <FormGroup>
        <ControlLabel>
          {props.label}
        </ControlLabel>
        <FormControl
          onChange={props.onChange}
          placeholder={"id_tipo_descuento"}
          value={props.input.value}
          componentClass="select">
          {props.options.map(option => (
            <option
              value={option.value}
              key={option.value}
            >{option.text}</option>
          ))}
        </FormControl>
        {props.touched && props.error && <span>{props.error}</span>}
      </FormGroup>
    </div>
  );
}

export default SelectField;
