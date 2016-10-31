/**
 * Created by enriq on 28/09/16.
 */
import React from 'react';
import {
  ControlLabel, FormControl, FormGroup
} from 'react-bootstrap';

const SelectField = ({input, label, xxx, meta: {touched, error}}) =>{
 debugger
  return (
    <div>
      {xxx}
      <FormGroup>
        <ControlLabel>
          {label}
        </ControlLabel>
        <FormControl
          {...input}
          placeholder={label}
          componentClass="select">
        </FormControl>
        {touched && error && <span>{error}</span>}
      </FormGroup>
    </div>
  );
}

export default SelectField;
