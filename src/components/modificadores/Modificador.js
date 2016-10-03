import React, {Component, PropTypes} from 'react';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {
  Button,
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
  errors.minimo = check.isNumber(values.minimo);
  errors.maximo = check.isNumber(values.maximo);
  errors.codigo = check.isNumber(values.codigo);
  return errors
}

let Modificador = props => {
  const {
    initialValues,
    modificadorSubmit,
    handleSubmit,
    modificadorClick
  }= props;
  // if (_.isEmpty(initialValues)) {
  //   return (<div></div>);
  // }


  return (
    <Well>
      <form onSubmit={handleSubmit(modificadorSubmit)}>
        <FormGroup>
          <Row className="show-grid">
            <Col md={9}>
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
                name="maximo"
                label="Maximo"
                type="text"
                component={InputField}
              />
            </Col>
            <Col md={3}> <Field
              name="minimo"
              label="Minimo"
              type="text"
              component={InputField}
            />
            </Col>
            <Col md={3}>
              <Field
                name="orden"
                label="Orden"
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
                {_.isEmpty(initialValues) ? "Crear " : "Guardar "}
                <Glyphicon glyph="floppy-save"/>
              </Button>
              <Button
                onClick={()=>modificadorClick({})}
                bsStyle="primary">
                {"Reset "}
                <Glyphicon glyph="floppy-save"/>
              </Button>
            </Col>

          </Row>
        </FormGroup>
      </form>
    </Well>
  );
};


Modificador = reduxForm({
  form: 'modificadorForm',
  enableReinitialize: true,
  validate
})(Modificador);

Modificador.PropTypes = {};

export default Modificador;
