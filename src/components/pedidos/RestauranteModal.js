/**
 * Created by enriq on 10/10/16.
 */

import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Button,
  Glyphicon,
  Row, Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Grid,
  Modal,
  ButtonGroup,
  Well
} from 'react-bootstrap';
import RestaurantesList from './RestaurantesList'
import DireccionesList from './DireccionesList'
import _ from 'lodash';

let RestauranteModal = props => {
  const {
    isRestauranteModalActive,
    restauranteModalOff,
    cliente,
    selectRestauranteForm,
    restaurante,
    restaurantes,
    direccion,
    ciudad,
    submitInitialPedido,
    selectDireccion,
    createDireccion,
    direcciones,
    handleDestroyDireccion,
    lat,
    lng,
  }= props;

  let renderSiguienteButton = () => {
    if (!_.isEmpty(restaurante)) {
      return (
        <Button
          bsSize="large"
          bsStyle="primary"
          block
          onClick={() => submitInitialPedido(cliente,direccion,restaurante)}
        >
          Continuar
        </Button>
      )
    }
  }
  let renderRestaurantesList = () => {
    if (!_.isEmpty(ciudad)) {
      return (
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Restaurante</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="Seleccione"
            value={restaurante ? restaurante.id : 'select'}
            onChange={selectRestauranteForm}
          >
            <option value="select">Select</option>
            {restaurantes.map((restaurante, i)=>{
              return <option key={i} value={restaurante.id}>{restaurante.nombre}</option>
            })}
          </FormControl>
        </FormGroup>
      )
    }
  }

  let renderDireccionesList = () => {
    if (!_.isEmpty(cliente)) {
      return (
        <DireccionesList
          selectDireccion={selectDireccion}
          handleDestroyDireccion={handleDestroyDireccion}
          createDireccion={createDireccion}
          cliente={cliente}
        >
          {direcciones}
        </DireccionesList>)
    }
  }
  return (
    <div>
      <Modal
        bsSize="large"
        show={isRestauranteModalActive}
        //onHide={() => restauranteModalOff()}
      >
        <Modal.Body style={{textAlign: "center"}}>
          {renderDireccionesList()}
          {renderRestaurantesList()}
          {renderSiguienteButton()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => restauranteModalOff()}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

RestauranteModal.propTypes = {};

export default RestauranteModal;
