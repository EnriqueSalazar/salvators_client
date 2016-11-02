/**
 * Created by enriq on 10/10/16.
 */

import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Button,
  Glyphicon,
  Row, Col,
  FormGroup,
  Grid,
  Modal,
  ButtonGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import _ from 'lodash';
import InputField from '../InputField';
import SelectField from '../SelectField';
import check from '../check';
import { DateField } from 'react-date-picker'
import moment from 'moment';

const validate = values => {
  const errors = {};
  errors.codigo = check.isNumber(values.codigo);
  errors.id_tipo_descuento = check.isNumber(values.id_tipo_descuento);
  errors.cantidad = check.isNumber(values.cantidad);
  errors.valor_maximo = check.isNumber(values.valor_maximo);
  return errors
};

let DescuentoModal = props => {
  const {
    initialValues,
    descuentosSubmit,
    handleSubmit,
    isModalActive,
    descuentoModalOff
  }= props;

  let DeleteButton = () => {
    return (
      <Button
        type="button"
        bsStyle="danger"
        onClick={() => props.destroyDescuento(initialValues.id)}
      >
        <Glyphicon glyph="erase"/>
      </Button>
    )
  };
  let setTipoDescuento = (e) => {
    // initialValues.id_tipo_descuento = parseInt(e.target.value, 10);
    props.updateDescuento(
      Object.assign({},
        initialValues,
        {
          id_tipo_descuento : parseInt(e.target.value, 10)
        }))
  }
let formattedMoment =(fecha)=>{
  if (fecha) {
    let momentFromCell = moment.utc(fecha, "YYYY-MM-DDTHH:mm:ssZ");
    return momentFromCell.format('YYYY-MM-DD');
  }
};



  return (
    <div>
      <Modal
        bsSize="large"
        show={isModalActive}
        onHide={() => descuentoModalOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Descuento</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(descuentosSubmit)}>
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
                      name="codigo"
                      label="Codigo"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                  <Col md={3}>
                    <ControlLabel>
                      {'Tipo de Descuento'}
                    </ControlLabel>
                    <Field
                      className="form-control"
                      component="select"
                      placeholder="select"
                      name="id_tipo_descuento"
                    >
                      <option>Seleccione</option>
                      <option value="1">a</option>
                      <option value="2">b</option>
                      <option value="3">c</option>
                      <option value="4">d</option>
                    </Field>
                  </Col>
                  <Col md={3}>
                    <Field
                      name="cantidad"
                      label="Cantidad"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                  <Col md={3}>
                    <Field
                      name="valor_maximo"
                      label="Valor Maximo"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                  <Col md={3}>
                    <ControlLabel>
                      {'Fecha de Inicio'}
                    </ControlLabel>
                    <DateField
                      dateFormat="YYYY-MM-DD"
                      defaultValue={formattedMoment(initialValues.fecha_inicio)}
                      onChange={(dateString, {dateMoment, timestamp}) => {
                        props.updateDescuento(
                          Object.assign({},
                            initialValues,
                            {
                              fecha_inicio: dateMoment.format("YYYY-MM-DDTHH:mm:ssZ")
                            }))
                      }}
                    />
                  </Col>
                  <Col md={3}>
                    <ControlLabel>
                      {'Fecha de Finalizacion'}
                    </ControlLabel>
                    <DateField
                      dateFormat="YYYY-MM-DD"
                      defaultValue={formattedMoment(initialValues.fecha_fin)}
                      onChange={(dateString, {dateMoment, timestamp}) => {
                        props.updateDescuento(
                          Object.assign({},
                            initialValues,
                            {
                              fecha_fin: dateMoment.format("YYYY-MM-DDTHH:mm:ssZ")
                            }))
                      }}
                    />
                  </Col>
                  <Col md={1}>
                    <Field
                      name="is_inactivo"
                      label="Inactivo"
                      type="checkbox"
                      component={InputField}
                    />
                  </Col>
                  <Col md={2}>
                    <Field
                      name="is_excluido_bar"
                      label="Excluido Bar"
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

DescuentoModal = reduxForm({
  form: 'descuentoModalForm',
  enableReinitialize: true,
  validate
})(DescuentoModal);

DescuentoModal.propTypes = {
  initialValues: PropTypes.object.isRequired,
  descuentosSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default DescuentoModal;
