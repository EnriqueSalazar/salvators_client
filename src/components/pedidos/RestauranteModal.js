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
  Grid,
  Modal,
  ButtonGroup,
  Well
} from 'react-bootstrap';
import RestaurantesList from './RestaurantesList'
import _ from 'lodash';

let RestauranteModal = props => {
  const {
    isRestauranteModalActive,
    restauranteModalOff,
    cliente,
    selectRestaurante,
    restaurante,
    restaurantes,
    direccion,
    ciudad,
    submitInitialPedido
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
        <RestaurantesList
          selectRestaurante={selectRestaurante}
          direccion={direccion}
        >
          {restaurantes}
        </RestaurantesList>
      )
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

          <Well>

            <h3>
              <div style={{
                textAlign: 'left',
              }}>
                <Grid fluid>
                  <Row>
                    <Col md={6}>
                      <h1>
                        Cliente
                      </h1>
                      <strong>
                        Nombre:
                      </strong>
                      {' ' + cliente.nombre}<br />
                      <strong>
                        Cedula:
                      </strong>
                      {' ' + cliente.cedula}<br />
                      <strong>
                        Telefono:
                      </strong>
                      {' ' + cliente.telefono}<br />
                      <strong>
                        Direccion:
                      </strong>
                      {' ' + direccion.direccion}<br />
                      <strong>
                        Ciudad:
                      </strong>
                      {' ' + ciudad.nombre}
                    </Col>
                    <Col md={6}>
                      <h1>
                        Restaurante
                      </h1>
                      <strong>
                        Nombre:
                      </strong>
                      {' ' + restaurante.nombre}<br />
                      <strong>
                        Cedula:
                      </strong>
                      {' ' + restaurante.valor}<br />
                      <strong>
                        Direccion:
                      </strong>
                      {' ' + restaurante.direccion}<br />
                      <strong>
                        Ciudad:
                      </strong>
                      {' ' + ciudad.nombre}
                    </Col>
                  </Row>
                </Grid>
              </div>
            </h3>
          </Well>
          {renderRestaurantesList()}
          {renderSiguienteButton()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => restauranteModalOff()}>Cerrar</Button>
        </Modal.Footer>
      </Modal >
    </
      div >
  )
    ;
};

RestauranteModal.propTypes = {};

export default RestauranteModal;


