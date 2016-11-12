import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  loadEstados,
  destroyEstado,
  createEstado,
  updateEstado,
} from '../../actions/estadoActions';

import EstadoModal from '../../components/estados/estadosModal'
import EstadosList from '../../components/estados/estadosList'

import { Grid, Col, Row, Button, Glyphicon } from 'react-bootstrap';

class EditEstados extends Component {

  constructor(props) {
    super(props);
    this.state = {
      estado: {},
      editingEstado: false,
    };
  }

  componentDidMount() {
    this.props.loadEstados();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateEstados) {
      this.props.loadEstados();
      this.estadoModalOff();
    }
  }

  handleUpdateEstado = (estado) => {
    if (estado.id) {
      this.props.updateEstado(estado.id, estado);
    } else {
      this.props.createEstado(estado);
    }
  };

  estadoModalOff = () => {
    this.setState({editingEstado: false, estado: {}});
  };

  updateEstado = (estado) => {
    this.setState({editingEstado: true, estado: estado});
  }

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={9}>
              <EstadosList
                selectEstado={this.updateEstado}
              >
                {this.props.estados}
              </EstadosList>
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => this.updateEstado({})}
              bsStyle="primary"
            >
              <Glyphicon glyph="plus"/>{' Agregar'}
            </Button>
          </Row>
        </Grid>
        <EstadoModal
          initialValues={this.state.estado}
          estadosSubmit={this.handleUpdateEstado}
          isModalActive={this.state.editingEstado}
          estadoModalOff={this.estadoModalOff}
          destroyEstado={this.props.destroyEstado}
        />
      </div>
    );
  };
}

EditEstados.propTypes = {
  loadEstados: PropTypes.func.isRequired,
  destroyEstado: PropTypes.func.isRequired,
  createEstado: PropTypes.func.isRequired,
  updateEstado: PropTypes.func.isRequired,
  estados: PropTypes.array.isRequired,
  estado: PropTypes.object.isRequired,
  shouldUpdateEstados: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    estadoReducer,
  } = state;
  const {estados, shouldUpdateEstados, estado} = estadoReducer;
  return {
    estados,
    estado,
    shouldUpdateEstados,
  };
}

export default connect(mapStateToProps, {
  loadEstados,
  destroyEstado,
  createEstado,
  updateEstado,
})(EditEstados);
