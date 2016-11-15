/**
 * Created by enriq on 10/10/16.
 */

import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import DomiciliariosList from './DomiciliariosList'
import DomiciliarioPedidosList from './DomiciliarioPedidosList'
import _ from 'lodash';

let DomiciliarioModal = props => {
  const {
    isDomiciliarioModalActive,
    domiciliarioModalOff,
    domiciliario,
    pedidos,
    selectDomiciliario,
    domiciliarios,
    handleAsignarPedidoDomiciliario,
    handleAceptarPedidosDomiciliario,
    clientes,
    direcciones,
    pedido
  }= props;
  let renderDomiciliariosList = () => {
    if (!_.isEmpty(domiciliarios)) {
      return (
        <DomiciliariosList
          selectDomiciliario={selectDomiciliario}
        >
          {domiciliarios}
        </DomiciliariosList>
      )
    }
  }
  let renderPedidosList = () => {
    if (!_.isEmpty(pedidos)) {
      return (
        <DomiciliarioPedidosList
          clientes={clientes}
          direcciones={direcciones}
        >
          {pedidos}
        </DomiciliarioPedidosList>)
    }
  }

  let renderButtons = () => {
    if (!_.isEmpty(domiciliario) && !_.isEmpty(pedido)) {
      return (
        <div>
          <Button
            bsSize="large"
            bsStyle="primary"
            block
            onClick={
              () =>
                handleAsignarPedidoDomiciliario(pedido, domiciliario)}
          >
            Asignar Pedido
          </Button>
          <Button
            bsSize="large"
            bsStyle="primary"
            block
            onClick={() => handleAceptarPedidosDomiciliario(pedidos, pedido, domiciliario)}
          >
            Aceptar y Asignar
          </Button>
        </div>
      )
    }
  }

  return (
    <div>
      <Modal
        bsSize="large"
        show={isDomiciliarioModalActive}
        //onHide={() => DomiciliarioModalOff()}
      >
        <Modal.Body style={{textAlign: "center"}}>
          {renderDomiciliariosList()}
          {renderPedidosList()}
          {renderButtons()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => domiciliarioModalOff()}>Cerrar</Button>
        </Modal.Footer>
      </Modal >
    </div >
  );
};

DomiciliarioModal.propTypes = {};

export default DomiciliarioModal;


