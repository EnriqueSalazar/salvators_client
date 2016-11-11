import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  loadRestaurantes,
  destroyRestaurante,
  createRestaurante,
  updateRestaurante,
} from '../../actions/restauranteActions';
import {
  loadCiudades,
} from '../../actions/ciudadActions';

import RestauranteModal from '../../components/restaurantes/restaurantesModal'
import RestaurantesList from '../../components/restaurantes/restaurantesList'

import { Grid, Col, Row, Button, Glyphicon } from 'react-bootstrap';

class EditRestaurantes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurante: {},
      editingRestaurante: false,
    };
  }

  componentDidMount() {
    this.props.loadRestaurantes();
    this.props.loadCiudades();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateRestaurantes) {
      this.props.loadRestaurantes();
      this.props.loadCiudades();
      this.restauranteModalOff();
    }
  }

  handleUpdateRestaurante = (restaurante) => {
    restaurante.id_ciudad = parseInt(restaurante.id_ciudad, 10);
    debugger
    if (restaurante.id) {
      this.props.updateRestaurante(restaurante.id, restaurante);
    } else {
      this.props.createRestaurante(restaurante);
    }
  };

  restauranteModalOff = () => {
    this.setState({editingRestaurante: false, restaurante: {}});
  };

  updateRestaurante = (restaurante) => {
    this.setState({editingRestaurante: true, restaurante: restaurante});
  }

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={9}>
              <RestaurantesList
                selectRestaurante={this.updateRestaurante}
                ciudades={this.props.ciudades}
              >
                {this.props.restaurantes}
              </RestaurantesList>
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => this.updateRestaurante({})}
              bsStyle="primary"
            >
              <Glyphicon glyph="plus"/>{' Agregar'}
            </Button>
          </Row>
        </Grid>
        <RestauranteModal
          initialValues={this.state.restaurante}
          restaurantesSubmit={this.handleUpdateRestaurante}
          isModalActive={this.state.editingRestaurante}
          restauranteModalOff={this.restauranteModalOff}
          destroyRestaurante={this.props.destroyRestaurante}
          updateRestaurante={this.updateRestaurante}
          ciudades={this.props.ciudades}
        />
      </div>
    );
  };
}

EditRestaurantes.propTypes = {
  loadRestaurantes: PropTypes.func.isRequired,
  destroyRestaurante: PropTypes.func.isRequired,
  createRestaurante: PropTypes.func.isRequired,
  updateRestaurante: PropTypes.func.isRequired,
  restaurantes: PropTypes.array.isRequired,
  restaurante: PropTypes.object.isRequired,
  shouldUpdateRestaurantes: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    restauranteReducer,
    ciudadReducer
  } = state;
  const {restaurantes, shouldUpdateRestaurantes} = restauranteReducer;
  const {ciudades, shouldUpdateCiudades} = ciudadReducer;
  return {
    restaurantes,
    shouldUpdateRestaurantes,
    ciudades,
    shouldUpdateCiudades
  };
}

export default connect(mapStateToProps, {
  loadRestaurantes,
  destroyRestaurante,
  createRestaurante,
  updateRestaurante,
  loadCiudades,
})(EditRestaurantes);
