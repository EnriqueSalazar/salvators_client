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
  ButtonGroup,
  ControlLabel
} from 'react-bootstrap';
import _ from 'lodash';
import InputField from '../InputField';

let CancelacionForm = props => {
  const {
    initialValues,
    cancelacionFormSubmit,
    handleSubmit,
    isModalActive,
    cancelacionFormOff
  }= props;

  return (
    <div>
      <Modal
        bsSize="large"
        show={isModalActive}
        onHide={() => cancelacionFormOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancelacion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(cancelacionFormSubmit)}>
            <FormGroup>
              <Grid>
                <Row className="show-grid">
                  <Col md={5}>
                    <ControlLabel>
                      Nota del Cliente
                    </ControlLabel>
                    <br />
                    <Field
                      name="nota_cliente"
                      component="textarea"
                      rows="10" cols="50"
                    />
                  </Col>
                  <Col md={5}>
                    <ControlLabel>
                      Nota del Operador
                    </ControlLabel>
                    <br />
                    <Field
                      name="nota_operador"
                      component="textarea"
                      rows="10" cols="50"
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
                        { " Anular"}
                      </Button>

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

CancelacionForm = reduxForm({
  form: 'cancelacionFormForm',
  enableReinitialize: true,
})(CancelacionForm);

CancelacionForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  cancelacionFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default CancelacionForm;
