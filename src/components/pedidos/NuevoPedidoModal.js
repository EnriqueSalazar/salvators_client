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
import CiudadesList from './CiudadesList'
import _ from 'lodash';

let NuevoPedidoModal = props => {
  const {
    isNuevoPedidoModalActive,
    nuevoPedidoModalOff,
    cliente,
    selectCliente,
    createCliente,
    optionsModalOn,
    clientes,
    ciudades,
    selectCiudad,
    ciudad,
    handleDestroyCliente,
  }= props;

  let renderSiguienteButton = () => {
    if (!_.isEmpty(cliente) && !_.isEmpty(ciudad)) {
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


          <CiudadesList
            selectCiudad={selectCiudad}
            ciudad={ciudad}
          >
            {ciudades}
          </CiudadesList>
          {renderClientesList()}
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


