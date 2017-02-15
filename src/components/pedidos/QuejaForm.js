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

let QuejaForm = props => {
  const {
    initialValues,
    quejaFormSubmit,
    handleSubmit,
    isModalActive,
    quejaFormOff
  }= props;

  return (
    <div>
      <Modal
        bsSize="large"
        show={isModalActive}
        onHide={() => quejaFormOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Queja</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(quejaFormSubmit)}>
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
                        { " Guardar"}
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

QuejaForm = reduxForm({
  form: 'quejaFormForm',
  enableReinitialize: true,
})(QuejaForm);

QuejaForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  quejaFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default QuejaForm;
