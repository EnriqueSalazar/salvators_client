import React, { PropTypes } from 'react';
import {
  Button,
  Glyphicon,
  Row, Col,
  FormGroup,
  Grid,
  Modal,
  ButtonGroup,
  Well
} from 'react-bootstrap';
const CiudadesList = props => {
  let ciudades = props.children;

  return (
    <div >
      {ciudades.map((ciudad, i) => {
        return (<Button
          key={i}
          onClick={() => props.selectCiudad(ciudad)}
          bsStyle="success"
          style={{
            whiteSpace: 'normal',
            width: '200'
          }}
          active={!_.isEmpty(props.ciudad) && ciudad.id==props.ciudad.id}
        >
          {ciudad.nombre}
        </Button>)
      })}
    </div>
  )
};

CiudadesList.propTypes = {};

export default CiudadesList;
