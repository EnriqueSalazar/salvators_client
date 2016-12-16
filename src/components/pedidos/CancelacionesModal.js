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
import CancelacionesList
  from './CancelacionesList';
import CancelacionForm
  from './CancelacionForm';
import _ from 'lodash';

let CancelacionesModal = props => {
  const {
    isCancelacionesModalActive,
    cancelacionesModalOff,
    restaurantes,
    direccion,
    ciudad,
    submitInitialPedido,
    estados,
    pedido,
    pedidos,
    clientes,
    direcciones,
    domiciliarios,
    onPedidosClick,
    cliente
  }= props;

  let renderCancelacionesList = () => {
    let pedidosCancelados = pedidos.filter(
      pedido => pedido.id_estado == 6 && pedido.id_cliente == cliente.id
    );
    return (
      <CancelacionesList
        clientes={clientes}
        direcciones={direcciones}
        restaurantes={restaurantes}
        estados={estados}
        domiciliarios={domiciliarios}
        onPedidosClick={onPedidosClick}
      >
        {pedidosCancelados}
      </CancelacionesList>
    );
  };
  return (
    <div>
      <Modal
        bsSize="large"
        show={isCancelacionesModalActive}
        onHide={() => cancelacionesModalOff()}
      >
        <Modal.Body style={{textAlign: "center"}}>
          Modal
          <br/>
          {renderCancelacionesList()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => cancelacionesModalOff()}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CancelacionesModal.propTypes = {};

export default CancelacionesModal;
