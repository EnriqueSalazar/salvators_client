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

let FormaPagoModal = props => {
  const {
    initialValues,
    formasPagoubmit,
    handleSubmit,
    isModalActive,
    formaPagoModalOff
  }= props;

  let DeleteButton = () => {
    return (
      <Button
        type="button"
        bsStyle="danger"
        onClick={() => props.destroyFormaPago(initialValues.id)}
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
        onHide={() => formaPagoModalOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>FormaPago</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(formasPagoubmit)}>
            <FormGroup>
              <Grid>
                <Row className="show-grid">
                  <Col md={9}>
                    <Field
                      name="nombre"
                      label="Nombre"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                  <Col md={9}>
                    <Field
                      name="is_inactivo"
                      label="Inactivo"
                      type="checkbox"
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

FormaPagoModal = reduxForm({
  form: 'formaPagoModalForm',
  enableReinitialize: true,
})(FormaPagoModal);

FormaPagoModal.propTypes = {
  initialValues: PropTypes.object.isRequired,
  formasPagoubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default FormaPagoModal;
