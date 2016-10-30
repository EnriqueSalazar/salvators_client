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
  Modal
} from 'react-bootstrap';
import _ from 'lodash';
import InputField from '../InputField';
import check from '../check';

const validate = values => {
  const errors = {};
  errors.minimo = check.isNumber(values.minimo);
  errors.maximo = check.isNumber(values.maximo);
  errors.codigo = check.isNumber(values.codigo);
  return errors
};

let SubmodModal = props => {
  const {
    initialValues,
    submodificadorSubmit,
    handleSubmit,
    submodificadorSelect
  }= props;
  return (
    <div>
      <Modal
        bsSize="large"
        show={!(_.isEmpty(initialValues))}
        onHide={()=>submodificadorSelect({})}
      >
        <Modal.Header closeButton>
          <Modal.Title>Submodificador</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(submodificadorSubmit)}>
            <FormGroup>
              <Grid>
                <Row className="show-grid">
                  <Col md={9}>
                    <Field
                      name="codigo"
                      label="Codigo"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
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
                      name="maximo"
                      label="Maximo"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                  <Col md={9}>
                    <Field
                      name="minimo"
                      label="Minimo"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                  <Col md={9}>
                    <Button
                      type="submit"
                      bsStyle="primary">
                      {"Guardar "}
                      <Glyphicon glyph="floppy-save"/>
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={()=>submodificadorSelect({})}
          >Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

SubmodModal = reduxForm({
  form: 'modificadorForm',
  enableReinitialize: true,
  validate
})(SubmodModal);

SubmodModal.propTypes = {
  initialValues:PropTypes.object.isRequired,
  submodificadorSubmit:PropTypes.func.isRequired,
  handleSubmit:PropTypes.func,
  submodificadorSelect:PropTypes.func.isRequired
};

export default SubmodModal;
