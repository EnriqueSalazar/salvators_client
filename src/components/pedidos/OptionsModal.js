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
import _ from 'lodash';

let OptionsModal = props => {
  const {
    isOptionsModalActive,
    optionsModalOff,
    cliente,
    direccion,
    ciudad,
    restauranteModalOn,
    cancelacionFormOn,
    quejaFormOn,
    pedido
  }= props;
  let isCliente = cliente && cliente.id;
  let isCiudad = ciudad && ciudad.id;
  let isDireccion = direccion && direccion.id;
  return (
    <div>
      <Modal
        bsSize="large"
        show={isOptionsModalActive}
        onHide={() => optionsModalOff()}
      >
        <Modal.Body style={{textAlign: "center"}}>
          <Well>
            <Grid fluid>
              <Row style={!!pedido.id ? {display: 'none'} : {}}>
                <Col md={6}>
                  <strong>
                    Nombre:
                  </strong>
                  {' ' + isCliente ? cliente.nombre : ''}<br />
                  <strong>
                    Cedula:
                  </strong>
                  {' ' + isCliente ? cliente.cedula : ''}<br />
                  <strong>
                    Telefono:
                  </strong>
                  {' ' + isCliente ? cliente.telefono : ''}<br />
                  <strong>
                    Direccion:
                  </strong>
                  {' ' + isDireccion ? direccion.direccion : ''}<br />
                  <strong>
                    Ciudad:
                  </strong>
                  {' ' + isCiudad ? ciudad.nombre : ''}
                </Col>
                <Col md={6}>
                  <Button
                    onClick={() => restauranteModalOn()}
                    bsStyle="success"
                    block
                    style={{
                      whiteSpace: 'normal',
                    }}
                  >
                    <h1><Glyphicon glyph="send"/></h1>{' Nuevo Domicilio'}
                  </Button>
                </Col>
              </Row>
              <Row style={!!pedido.id ? {} : {display: 'none'}}>
                <Col md={6}>
                  <Button
                    onClick={() => quejaFormOn()}
                    bsStyle="warning"
                    block
                    style={{
                      whiteSpace: 'normal',
                    }}
                  >
                    <h1><Glyphicon glyph="thumbs-down"/></h1>{' Quejas y Reclamos'}
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    onClick={() => cancelacionFormOn()}
                    bsStyle="danger"
                    block
                    style={{
                      whiteSpace: 'normal',
                    }}
                    disabled={pedido.id && pedido.id_estado >=2}
                  >
                    <h1 ><Glyphicon glyph="trash"/></h1>{' Cancelaciones'}
                  </Button>
                </Col>

              </Row>
            </Grid>

            <br/>
            <br/>

            <br/>
            <br/>

            <br/>
            <br/>

            <br/>
            <br/>

          </Well>
        </Modal.Body>
      </Modal>
    </div>
  );
};

OptionsModal.propTypes = {};

export default OptionsModal;
