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

let notaModal = props => {
  const {
    initialValues,
    notasSubmit,
    handleSubmit,
    isModalActive,
    notaModalOff
  }= props;

  return (
    <div>
      <Modal
        bsSize="large"
        show={isModalActive}
        onHide={() => notaModalOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(notasSubmit)}>
            <FormGroup>
              <Grid fluid>
                <Row className="show-grid">
                  <Col md={12}>
                    <ControlLabel>
                      Nota
                    </ControlLabel>
                    <br />
                    <Field
                      name="nota_pedido"
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

notaModal = reduxForm({
  form: 'notaModalForm',
  enableReinitialize: true,
})(notaModal);

notaModal.propTypes = {
  initialValues: PropTypes.object.isRequired,
  notasSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default notaModal;
