/**
 * Created by enriq on 10/10/16.
 */
//todo bootstrap the textarea style
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

let notaPagoModal = props => {
  const {
    initialValues,
    notaPagosSubmit,
    handleSubmit,
    isModalActive,
    notaPagoModalOff
  }= props;

  return (
    <div>
      <Modal
        bsSize="large"
        show={isModalActive}
        onHide={() => notaPagoModalOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>NotaPago</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(notaPagosSubmit)}>
            <FormGroup>
              <Grid fluid>
                <Row className="show-grid">
                  <Col md={12}>
                    <ControlLabel>
                      Textarea
                    </ControlLabel>
                    <br />
                    <Field
                      name="nota_forma_pago"
                      component="textarea"
                      rows="10" cols="70"
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                  <Col md={12}>
                    <ButtonGroup>
                      <Button
                        type="submit"
                        bsStyle="primary">
                        <Glyphicon glyph="floppy-save"/>
                        {' Actualizar'}
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

notaPagoModal = reduxForm({
  form: 'notaPagoModalForm',
  enableReinitialize: true,
})(notaPagoModal);

notaPagoModal.propTypes = {
  initialValues: PropTypes.object.isRequired,
  notaPagosSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default notaPagoModal;
