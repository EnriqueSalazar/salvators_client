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
  ControlLabel,
  FormControl,
  Grid,
  Modal,
  ButtonGroup,
  Well,
  Form,
  Alert,
  Label,
} from 'react-bootstrap';
import GoogleMap from 'google-map-react';

import RestaurantesList from './RestaurantesList'
import DireccionesList from './DireccionesList'
import Marker from './Marker'
import _ from 'lodash';

let RestauranteModal = props => {
  const {
    isRestauranteModalActive,
    restauranteModalOff,
    cliente,
    selectRestauranteForm,
    restaurante,
    restaurantes,
    direccion,
    ciudad,
    submitInitialPedido,
    selectDireccion,
    createDireccion,
    direcciones,
    handleDestroyDireccion,
    lat,
    lng,
    updateDireccionText,
    direccionTextAsArray,
    direccionCoords,
    direccionCoordsMsg,
    updateDireccionMapCoords,
    updateInteriorText,
    interiorTextAsArray,
  } = props;

  let renderSiguienteButton = () => {
    if (!_.isEmpty(restaurante)) {
      return (
        <Button
          bsSize="large"
          bsStyle="primary"
          block
          onClick={() => submitInitialPedido(cliente, direccion, restaurante)}
        >
          Continuar
        </Button>
      )
    }
  }
  const renderDireccionForm = () => {
    return (<div>
        <Form inline>
          <FormGroup>
            <FormControl
              id='0'
              componentClass="select"
              onChange={updateDireccionText}
            >
              <option value=""></option>
              <option value="CALLE">CALLE</option>
              <option value="CARRERA">CARRERA</option>
              <option value="DIAGONAL">DIAGONAL</option>
              <option value="TRANSVERSAL">TRANSVERSAL</option>
              <option value="VIA">VIA</option>
            </FormControl>
            <FormControl
              id='1'
              type="text"
              onChange={updateDireccionText}
              style={{
                width: '4em',
              }}
            />
            <FormControl
              id='2'
              componentClass="select"
              onChange={updateDireccionText}
              style={{
                width: '5em',
              }}
            >
              <option value=""></option>
              {(function (rows) {
                for (let i = 65; i <= 90; i++) {
                  const letra = String.fromCharCode(i).toUpperCase();
                  rows.push(<option key={letra} value={letra}>{letra}</option>)
                  for (let j = 1; j <= 20; j++) {
                    const letraSub = letra + j;
                    rows.push(<option key={letraSub} value={letraSub}>{letraSub}</option>)
                  }
                }
                return rows;
              })([])}
            </FormControl>
            {'#'}
            <FormControl
              id='4'
              type="text"
              onChange={updateDireccionText}
              style={{
                width: '4em',
              }}
            />
            <FormControl
              id='5'
              componentClass="select"
              onChange={updateDireccionText}
              style={{
                width: '5em',
              }}
            >
              <option value=""></option>
              {(function (rows) {
                for (let i = 65; i <= 90; i++) {
                  const letra = String.fromCharCode(i).toUpperCase();
                  rows.push(<option key={letra} value={letra}>{letra}</option>)
                  for (let j = 1; j <= 20; j++) {
                    const letraSub = letra + j;
                    rows.push(<option key={letraSub} value={letraSub}>{letraSub}</option>)
                  }
                }
                return rows;
              })([])}
            </FormControl>
            <FormControl
              id='6'
              componentClass="select"
              onChange={updateDireccionText}
              style={{
                width: '5em',
              }}
            >
              <option value=""></option>
              {(function (rows) {
                for (let i = 65; i <= 90; i++) {
                  const letra = String.fromCharCode(i).toUpperCase();
                  rows.push(<option key={letra} value={letra}>{letra}</option>)
                  for (let j = 1; j <= 20; j++) {
                    const letraSub = letra + j;
                    rows.push(<option key={letraSub} value={letraSub}>{letraSub}</option>)
                  }
                }
                return rows;
              })([])}
            </FormControl>
            <FormControl
              id='8'
              type="text"
              onChange={updateDireccionText}
              style={{
                width: '5em',
              }}
            />

          </FormGroup>
          <Button bsStyle="primary" onClick={() => updateDireccionMapCoords()}>
            <Glyphicon glyph="globe"/>
          </Button>
          <Button
            bsStyle="success"
            onClick={() => createDireccion({
            direccion:direccionTextAsArray.join(' '),
              interno:interiorTextAsArray.join(' '),
              lat:direccionCoords && direccionCoords.lat,
              lng:direccionCoords && direccionCoords.lng,
              id_cliente:cliente && cliente.id
          })}>
            <Glyphicon glyph="floppy-disk"/>
          </Button>
        </Form>
      </div>
    )
  };

  const renderInteriorForm = () => {
    const field = (i) => {
      if (i % 2) {
        return (<FormControl
          key={i}
          id={i}
          value={interiorTextAsArray[i]}
          type="text"
          onChange={updateInteriorText}
          style={{
            width: '4em',
          }}
        />)
      } else {
        return ( <FormControl
          key={i}
          id={i}
          value={interiorTextAsArray[i]}
          componentClass="select"
          onChange={updateInteriorText}
          style={{
            width: '7em',
          }}
        >
          <option value=""></option>
          <option value="APTO">APTO</option>
          <option value="BARRIO">BARRIO</option>
          <option value="BDGA">BDGA</option>
          <option value="BLQU">BLQU</option>
          <option value="CASA">CASA</option>
          <option value="CONJ">CONJ</option>
          <option value="EDIF">EDIF</option>
          <option value="ESQN">ESQN</option>
          <option value="HABT">HABT</option>
          <option value="HOTEL">HOTEL</option>
          <option value="LCAL">LCAL</option>
          <option value="OFIC">OFIC</option>
          <option value="PISO">PISO</option>
          <option value="TORR">TORR</option>
        </FormControl>)
      }
    }
    const length = interiorTextAsArray.length;
    const limit = length % 2 ? length + 1 : length;
    return (<div>
        <Form inline>
          <FormGroup>
            {(function (rows) {
              for (let i = 0; i < limit; i++) {
                rows.push(field(i));
              }
              return rows;
            })([])}
            {field(limit + 0)}
            {field(limit + 1)}
          </FormGroup>
        </Form>
        {direccionTextAsArray.join(' ') + ' '}<Label
        bsStyle="info">{direccionCoords.lat + ' ' + direccionCoords.lng}</Label>&nbsp;
        <br />
        {interiorTextAsArray.join(' ')}<br />

      </div>
    )
  }
  const renderAlert = () => {
    if (direccionCoordsMsg != '') {
      return (<div>
          <Alert bsStyle="danger">{direccionCoordsMsg}</Alert>
        </div>
      )
    }
  }

  let renderRestaurantesList = () => {
    if (!_.isEmpty(ciudad)) {
      return (
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Restaurante</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="Seleccione"
            value={restaurante ? restaurante.id : 'select'}
            onChange={selectRestauranteForm}
          >
            <option value="select">Select</option>
            {restaurantes.map((restaurante, i) => {
              return <option key={i} value={restaurante.id}>{restaurante.nombre}</option>
            })}
          </FormControl>
        </FormGroup>
      )
    }
  }

  let renderDireccionesList = () => {
    if (!_.isEmpty(cliente)) {
      return (
        <DireccionesList
          selectDireccion={selectDireccion}
          handleDestroyDireccion={handleDestroyDireccion}
          createDireccion={createDireccion}
          cliente={cliente}
        >
          {direcciones}
        </DireccionesList>)
    }
  }
  const renderMap = () => {
    return (<div style={{height: 150}}>
      <GoogleMap
        bootstrapURLKeys={{key: 'AIzaSyDB_jeDJCNUIDNwSkD8MaLWeUuHlB2wNE8'}}
        center={[direccionCoords.lat, direccionCoords.lng]}
        defaultZoom={17}>
        <Marker lat={direccionCoords.lat} lng={direccionCoords.lng}/>
      </GoogleMap>
    </div>);
  }

  return (
    <div>
      <Modal
        bsSize="large"
        show={isRestauranteModalActive}
        //onHide={() => restauranteModalOff()}
      >
        <Modal.Body style={{textAlign: "center"}}>
          <h3>Direcciones</h3>
          {renderDireccionForm()}
          {renderInteriorForm()}
          {renderAlert()}
          {renderMap()}
          {renderDireccionesList()}
          {renderRestaurantesList()}
          {renderSiguienteButton()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => restauranteModalOff()}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

RestauranteModal.propTypes = {};

export default RestauranteModal;
