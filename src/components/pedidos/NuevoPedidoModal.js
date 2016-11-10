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
import ClientesList from './ClientesList'
import DireccionesList from './DireccionesList'
import _ from 'lodash';

let NuevoPedidoModal = props => {
  const {
    isNuevoPedidoModalActive,
    nuevoPedidoModalOff,
    cliente,
    selectDireccion,
    destroyDireccion,
    createDireccion,
    direcciones,
    direccion,
    selectCliente,
    destroyCliente,
    createCliente,
    optionsModalOn,
    clientes
  }= props;
  let renderDireccionesList = () => {
    if (!_.isEmpty(cliente)) {
      return (
        <DireccionesList
          selectDireccion={selectDireccion}
          destroyDireccion={destroyDireccion}
          createDireccion={createDireccion}
          cliente={cliente}
        >
          {direcciones}
        </DireccionesList>)
    }
  }
  let renderSiguienteButton = () => {
    if (!_.isEmpty(direccion)) {
      return (
        <Button
          bsSize="large"
          bsStyle="primary"
          block
          onClick={() => optionsModalOn()}
        >
          Continuar
        </Button>
      )
    }

  }
  return (
    <div>
      <Modal
        bsSize="large"
        show={isNuevoPedidoModalActive}
        //onHide={() => nuevoPedidoModalOff()}
      >
        <Modal.Body style={{textAlign: "center"}}>
          <Well>
            <h3>

              <div style={{
                textAlign: 'left',
              }}>
                <Grid>

                  <Row>
                    <Col md={5}>
                      <strong>
                        Nombre:
                      </strong>
                      {' ' + cliente.nombre}<br />
                    </Col>
                    <Col md={5}>
                      <strong>
                        Cedula:
                      </strong>
                      {' ' + cliente.cedula}<br />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      <strong>
                        Telefono:
                      </strong>
                      {' ' + cliente.telefono}<br />

                    </Col>
                    <Col md={5}>
                      <strong>
                        Direccion:
                      </strong>
                      {' ' + direccion.direccion}<br />
                    </Col>

                  </Row>
                </Grid>
              </div>
            </h3>
          </Well>
          <ClientesList
            selectCliente={selectCliente}
            destroyCliente={destroyCliente}
            createCliente={createCliente}
          >
            {clientes}
          </ClientesList>
          {renderDireccionesList()}
          {renderSiguienteButton()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => nuevoPedidoModalOff()}>Cerrar</Button>
        </Modal.Footer>
      </Modal >
    </div >
  );
};

NuevoPedidoModal.propTypes = {};

export default NuevoPedidoModal;


