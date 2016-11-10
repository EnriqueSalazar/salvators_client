import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  loadDomiciliarios,
  destroyDomiciliario,
  createDomiciliario,
  updateDomiciliario,
} from '../../actions/domiciliarioActions';

import DomiciliarioModal from '../../components/domiciliarios/domiciliariosModal'
import DomiciliariosList from '../../components/domiciliarios/domiciliariosList'

import { Grid, Col, Row, Button, Glyphicon } from 'react-bootstrap';

class EditDomiciliarios extends Component {

  constructor(props) {
    super(props);
    this.state = {
      domiciliario: {},
      editingDomiciliario: false,
    };
  }

  componentDidMount() {
    this.props.loadDomiciliarios();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateDomiciliarios) {
      this.props.loadDomiciliarios();
      this.domiciliarioModalOff();
    }
  }

  handleUpdateDomiciliario = (domiciliario) => {
    if (domiciliario.id) {
      this.props.updateDomiciliario(domiciliario.id, domiciliario);
    } else {
      this.props.createDomiciliario(domiciliario);
    }
  };

  domiciliarioModalOff = () => {
    this.setState({editingDomiciliario: false, domiciliario: {}});
  };

  updateDomiciliario = (domiciliario) => {
    this.setState({editingDomiciliario: true, domiciliario: domiciliario});
  }

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={9}>
              <DomiciliariosList
                selectDomiciliario={this.updateDomiciliario}
              >
                {this.props.domiciliarios}
              </DomiciliariosList>
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => this.updateDomiciliario({})}
              bsStyle="primary"
            >
              <Glyphicon glyph="plus"/>{' Agregar'}
            </Button>
          </Row>
        </Grid>
        <DomiciliarioModal
          initialValues={this.state.domiciliario}
          domiciliariosSubmit={this.handleUpdateDomiciliario}
          isModalActive={this.state.editingDomiciliario}
          domiciliarioModalOff={this.domiciliarioModalOff}
          destroyDomiciliario={this.props.destroyDomiciliario}
        />
      </div>
    );
  };
}

EditDomiciliarios.propTypes = {
  loadDomiciliarios: PropTypes.func.isRequired,
  destroyDomiciliario: PropTypes.func.isRequired,
  createDomiciliario: PropTypes.func.isRequired,
  updateDomiciliario: PropTypes.func.isRequired,
  domiciliarios: PropTypes.array.isRequired,
  domiciliario: PropTypes.object.isRequired,
  shouldUpdateDomiciliarios: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    domiciliarioReducer,
  } = state;
  const {domiciliarios, shouldUpdateDomiciliarios, domiciliario} = domiciliarioReducer;
  return {
    domiciliarios,
    domiciliario,
    shouldUpdateDomiciliarios,
  };
}

export default connect(mapStateToProps, {
  loadDomiciliarios,
  destroyDomiciliario,
  createDomiciliario,
  updateDomiciliario,
})(EditDomiciliarios);
