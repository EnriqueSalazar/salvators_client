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
import check from '../check';

const validate = values => {
  const errors = {};
  errors.orden = check.isNumber(values.orden);
  return errors
};

let CategoriaModal = props => {
  const {
    initialValues,
    categoriaSubmit,
    handleSubmit,
    isModalActive,
    categoriaModalOff
  }= props;

  let DeleteButton = () => {
    return (
      <Button
        type="button"
        bsStyle="danger"
        onClick={() => props.destroyCategoria(initialValues.id)}
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
        onHide={() => categoriaModalOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(categoriaSubmit)}>
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

CategoriaModal = reduxForm({
  form: 'categoriaModalForm',
  enableReinitialize: true,
  validate
})(CategoriaModal);

CategoriaModal.propTypes = {
  initialValues: PropTypes.object.isRequired,
  categoriaSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default CategoriaModal;
