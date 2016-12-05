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

let DomiciliarioModal = props => {
  const {
    initialValues,
    domiciliariosSubmit,
    handleSubmit,
    isModalActive,
    domiciliarioModalOff
  }= props;

  let DeleteButton = () => {
    return (
      <Button
        type="button"
        bsStyle="danger"
        onClick={() => props.destroyDomiciliario(initialValues.id)}
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
        onHide={() => domiciliarioModalOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Domiciliario</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(domiciliariosSubmit)}>
            <FormGroup>
              <Grid>
                <Row className="show-grid">
                  <Col md={6}>
                    <Field
                      name="nombre"
                      label="Nombre"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                  <Col md={3}>
                    <Field
                      name="is_inactivo"
                      label="Inactivo"
                      type="checkbox"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
              </Grid>
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

DomiciliarioModal = reduxForm({
  form: 'domiciliarioModalForm',
  enableReinitialize: true,
})(DomiciliarioModal);

DomiciliarioModal.propTypes = {
  initialValues: PropTypes.object.isRequired,
  domiciliariosSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default DomiciliarioModal;
