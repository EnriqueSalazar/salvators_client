import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Button, ButtonGroup,
  Glyphicon,
  Row, Col,
  FormGroup,
  Well,
} from 'react-bootstrap';
import _ from 'lodash';
import InputField from '../InputField';
import check from '../check';

const validate = values => {
  const errors = {}
  errors.max_partes = check.isNumber(values.max_partes);
  errors.ordenamiento = check.isNumber(values.ordenamiento);
  errors.precio = check.isNumber(values.precio);
  errors.codigo = check.isNumber(values.codigo);
  return errors
}

let ItemDetail = props => {

  const {
    initialValues,
    itemSubmit,
    handleSubmit,
    handleDestroyItem
  }= props;
  //nunca pasar initialValues vacio, validar antes.
  // if (_.isEmpty(initialValues)) {
  //   initialValues = {}
  // }
  let deleteButton = () => {
    return (
      <Button
        onClick={() =>
          handleDestroyItem(initialValues.id)}
        bsStyle="danger">
        {"Eliminar "}
        <Glyphicon glyph="erase"/>
      </Button>
    )
  }
  return (
    <Well>
      <form onSubmit={handleSubmit(itemSubmit)}>
        <FormGroup>
          <Row className="show-grid">
            <Col md={3}>
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

            <Col md={3}>
              <Field
                name="is_descontable"
                label="Descontable"
                type="checkbox"
                component={InputField}
              />
            </Col>

            <Col md={3}>
              <Field
                name="is_etiqueta"
                label="Etiqueta"
                type="checkbox"
                component={InputField}
              />
            </Col>
          </Row>
          <br/>
          <Row className="show-grid">
            <Col md={3}>
              <Field
                name="codigo"
                label="Codigo"
                type="text"
                component={InputField}
              />
            </Col>
            <Col md={3}>
              <Field
                name="precio"
                label="Precios"
                type="text"
                component={InputField}
              />
            </Col>
            <Col md={3}>
              <Field
                name="ordenamiento"
                label="Orden"
                type="text"
                component={InputField}
              />
            </Col>
          </Row>
          <br/>
          <Row className="show-grid">
            <Col md={3}>
              <Field
                name="max_partes"
                label="Max partes"
                type="text"
                component={InputField}
              />
            </Col>
          <Col md={3}>
              <Field
                name="max_mod"
                label="Max Mod"
                type="text"
                component={InputField}
              />
            </Col>
          <Col md={3}>
              <Field
                name="min_mod"
                label="Min Mod"
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
                  bsStyle={_.isEmpty(initialValues) ?
                    "primary" :
                    "info"}
                >
                  {_.isEmpty(initialValues) ?
                    "Crear " :
                    "Guardar "}
                  <Glyphicon glyph="floppy-save"/>
                </Button>
                {_.isEmpty(initialValues) ?
                  null :
                  deleteButton()}
              </ButtonGroup>
            </Col>

          </Row>
        </FormGroup>
      </form>
    </Well>
  );
};

ItemDetail = reduxForm({
  form: 'itemForm',
  enableReinitialize: true,
  validate
})(ItemDetail);

ItemDetail.PropTypes = {};

export default ItemDetail;
