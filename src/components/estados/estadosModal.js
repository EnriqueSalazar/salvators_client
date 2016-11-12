/**
 * Created by enriq on 10/10/16.
 */

import React, {PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {
  Button,
  Glyphicon,
  Row, Col,
  FormGroup,
  Grid,
  Modal,
  ButtonGroup
} from 'react-bootstrap';
import _ from 'lodash';
import InputField from '../InputField';

let EstadoModal = props => {
  const {
    initialValues,
    estadosSubmit,
    handleSubmit,
    isModalActive,
    estadoModalOff
  }= props;

  let DeleteButton = () => {
    return (
      <Button
        type="button"
        bsStyle="danger"
        onClick={() => props.destroyEstado(initialValues.id)}
      >
        <Glyphicon glyph="erase"/>
      </Button>
    )
  };

  return (
    <div>
      <Modal
        bsSize="large"
        show={isModalActive}
        onHide={() => estadoModalOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(estadosSubmit)}>
            <FormGroup>
              <Grid fluid>
                <Row className="show-grid">
                  <Col md={4}>
                    <Field
                      name="nombre"
                      label="Nombre"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                 <Col md={4}>
                    <Field
                      name="color"
                      label="Color"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                 <Col md={4}>
                    <Field
                      name="style"
                      label="Estilo"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                  <Col md={9}>
                    <ButtonGroup>
                      <Button
                        type="submit"
                        bsStyle="primary">
                        <Glyphicon glyph="floppy-save"/>
                        {_.isEmpty(initialValues) ? " Crear" : " Guardar"}
                      </Button>
                      {_.isEmpty(initialValues) ? null : <DeleteButton/>}

                    </ButtonGroup>
                  </Col>
                </Row>
              </Grid>
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

EstadoModal = reduxForm({
  form: 'estadoModalForm',
  enableReinitialize: true,
})(EstadoModal);

EstadoModal.propTypes = {
  initialValues: PropTypes.object.isRequired,
  estadosSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default EstadoModal;
