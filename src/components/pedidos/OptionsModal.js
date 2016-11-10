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
    direccion
  }= props;

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
              <Row>
                <Col md={4}>
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
                </Col>
                <Col md={4}>
                  <Button
                    //onClick={() => this.props.updateOptions({})}
                    bsStyle="success"
                    block
                    style={{
                      whiteSpace: 'normal',
                    }}
                  >
                    <h1><Glyphicon glyph="send"/></h1>{' Nuevo Domicilio'}
                  </Button>
                </Col>
                <Col md={4}>
                  <Button
                    //onClick={() => this.props.updateOptions({})}
                    bsStyle="info"
                    block
                    style={{
                      whiteSpace: 'normal',
                    }}
                  >
                    <h1><Glyphicon glyph="eye-open"/></h1>{' Estado del Pedido'}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Button
                    //onClick={() => this.props.updateOptions({})}
                    bsStyle="warning"
                    block
                    style={{
                      whiteSpace: 'normal',
                    }}
                  >
                    <h1><Glyphicon glyph="thumbs-down"/></h1>{' Quejas y Reclamos'}
                  </Button>
                </Col>
                <Col md={4}>
                  <Button
                    //onClick={() => this.props.updateOptions({})}
                    bsStyle="danger"
                    block
                    style={{
                      whiteSpace: 'normal',
                    }}
                  >
                    <h1 ><Glyphicon glyph="trash"/></h1>{' Cancelaciones'}
                  </Button>
                </Col>
                <Col md={4}>
                  <Button
                    //onClick={() => this.props.updateOptions({})}
                    bsStyle="primary"
                    block
                    style={{
                      whiteSpace: 'normal',
                    }}
                  >
                    <h1><Glyphicon glyph="arrow-left"/></h1>{' Volver'}
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
      </Modal >
    </div >
  );
};

OptionsModal.propTypes = {};

export default OptionsModal;
