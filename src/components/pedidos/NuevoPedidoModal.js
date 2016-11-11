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
import CiudadesList from './CiudadesList'
import _ from 'lodash';

let NuevoPedidoModal = props => {
  const {
    isNuevoPedidoModalActive,
    nuevoPedidoModalOff,
    cliente,
    selectDireccion,
    createDireccion,
    direcciones,
    direccion,
    selectCliente,
    createCliente,
    optionsModalOn,
    clientes,
    ciudades,
    selectCiudad,
    ciudad,
    handleDestroyCliente,
    handleDestroyDireccion
  }= props;
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
  let renderSiguienteButton = () => {
    if (!_.isEmpty(direccion) && !_.isEmpty(ciudad)) {
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
  let renderClientesList = ()=>{
    if (!_.isEmpty(ciudad)){
      return (
        <ClientesList
          selectCliente={selectCliente}
          createCliente={createCliente}
          ciudad={ciudad}
          ciudades={ciudades}
          handleDestroyCliente={handleDestroyCliente}
        >
          {clientes}
        </ClientesList>
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
                <Grid fluid>
                  <Row>
                    <Col md={6}>
                      <strong>
                        Nombre:
                      </strong>
                      {' ' + cliente.nombre}<br />
                    </Col>
                    <Col md={6}>
                      <strong>
                        Cedula:
                      </strong>
                      {' ' + cliente.cedula}<br />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <strong>
                        Telefono:
                      </strong>
                      {' ' + cliente.telefono}<br />

                    </Col>
                    <Col md={6}>
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
          <CiudadesList
            selectCiudad={selectCiudad}
            ciudad={ciudad}
          >
            {ciudades}
          </CiudadesList>
          {renderClientesList()}
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


