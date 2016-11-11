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
  errors.id_tipo_restaurante = check.isNumber(values.id_tipo_restaurante);
  errors.cantidad = check.isNumber(values.cantidad);
  errors.valor_maximo = check.isNumber(values.valor_maximo);
  return errors
};

let RestauranteModal = props => {
  const {
    initialValues,
    restaurantesSubmit,
    handleSubmit,
    isModalActive,
    restauranteModalOff,
    ciudades
  }= props;

  let DeleteButton = () => {
    return (
      <Button
        type="button"
        bsStyle="danger"
        onClick={() => props.destroyRestaurante(initialValues.id)}
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
        onHide={() => restauranteModalOff()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Restaurante</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>
          <form onSubmit={handleSubmit(restaurantesSubmit)}>
            <FormGroup>
              <Grid>
                <Row className="show-grid">
                  <Col md={4}>
                    <Field
                      name="nombre"
                      label="Nombre"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                  <Col md={4}>
                    <Field
                      name="valor"
                      label="Valor"
                      type="text"
                      component={InputField}
                    />
                  </Col>
                </Row>
                <br/>
                <Row className="show-grid">
                  <Col md={4}>
                    <ControlLabel>
                      {'Ciudad'}
                    </ControlLabel>
                    <Field
                      className="form-control"
                      component="select"
                      placeholder="select"
                      name="id_ciudad"
                    >
                      <option>Seleccione</option>
                      {
                        ciudades.map((ciudad) => {
                          console.error(ciudad.id, ciudad.nombre)
                          return (
                            <option
                              value={ciudad.id}
                            >
                              {ciudad.nombre}
                            </option>
                          )
                        })
                      }
                    </Field>
                  </Col>
                  <Col md={4}>
                    <Field
                      name="direccion"
                      label="Direccion"
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

RestauranteModal = reduxForm({
  form: 'restauranteModalForm',
  enableReinitialize: true,
  validate
})(RestauranteModal);

RestauranteModal.propTypes = {
  initialValues: PropTypes.object.isRequired,
  restaurantesSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
};

export default RestauranteModal;
