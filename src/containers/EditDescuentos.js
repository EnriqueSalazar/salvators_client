import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  loadDescuentos,
  destroyDescuento,
  createDescuento,
  updateDescuento,
} from '../actions/descuentoActions';

import DescuentoModal from '../components/descuentos/descuentosModal'
import DescuentosList from '../components/descuentos/descuentosList'

import { Grid, Col, Row, Button, Glyphicon } from 'react-bootstrap';

class EditDescuentos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      descuento: {},
      editingDescuento: false,
    };
  }

  componentDidMount() {
    this.props.loadDescuentos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateDescuentos) {
      this.props.loadDescuentos();
      this.descuentoModalOff();
    }
  }

  handleUpdateDescuento = (descuento) => {
    if (descuento.id) {
      this.props.updateDescuento(descuento.id, descuento);
    } else {
      this.props.createDescuento(descuento);
    }
  };

  descuentoModalOff = () => {
    this.setState({editingDescuento: false, descuento: {}});
  };

  updateDescuento = (descuento) => {
    this.setState({editingDescuento: true, descuento: descuento});
  }

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={9}>
              <DescuentosList
                selectDescuento={this.updateDescuento}
              >
                {this.props.descuentos}
              </DescuentosList>
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => this.updateDescuento({})}
              bsStyle="primary"
            >
              <Glyphicon glyph="plus"/>{' Agregar'}
            </Button>
          </Row>
        </Grid>
        <DescuentoModal
          initialValues={this.state.descuento}
          descuentosSubmit={this.handleUpdateDescuento}
          isModalActive={this.state.editingDescuento}
          descuentoModalOff={this.descuentoModalOff}
          destroyDescuento={this.props.destroyDescuento}
          updateDescuento={this.updateDescuento}
        />
      </div>
    );
  };
}

EditDescuentos.propTypes = {
  loadDescuentos: PropTypes.func.isRequired,
  destroyDescuento: PropTypes.func.isRequired,
  createDescuento: PropTypes.func.isRequired,
  updateDescuento: PropTypes.func.isRequired,
  descuentos: PropTypes.array.isRequired,
  descuento: PropTypes.object.isRequired,
  shouldUpdateDescuentos: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    descuentoReducer,
  } = state;
  const {descuentos, shouldUpdateDescuentos, descuento} = descuentoReducer;
  return {
    descuentos,
    descuento,
    shouldUpdateDescuentos,
  };
}

export default connect(mapStateToProps, {
  loadDescuentos,
  destroyDescuento,
  createDescuento,
  updateDescuento,
})(EditDescuentos);
