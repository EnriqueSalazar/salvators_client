import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  loadFormasPago,
  destroyFormaPago,
  createFormaPago,
  updateFormaPago,
} from '../actions/formaPagoActions';

import FormaPagoModal from '../components/formasPago/formasPagoModal'
import FormasPagoList from '../components/formasPago/formasPagoList'

import { Grid, Col, Row, Button, Glyphicon } from 'react-bootstrap';

class EditFormasPago extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formaPago: {},
      editingFormaPago: false,
    };
  }

  componentDidMount() {
    this.props.loadFormasPago();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateFormasPago) {
      this.props.loadFormasPago();
      this.formaPagoModalOff();
    }
  }

  handleUpdateFormaPago = (formaPago) => {
    if (formaPago.id) {
      this.props.updateFormaPago(formaPago.id, formaPago);
    } else {
      this.props.createFormaPago(formaPago);
    }
  };

  formaPagoModalOff = () => {
    this.setState({editingFormaPago: false, formaPago: {}});
  };

  updateFormaPago = (formaPago) => {
    this.setState({editingFormaPago: true, formaPago: formaPago});
  }

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={9}>
              <FormasPagoList
                selectFormaPago={this.updateFormaPago}
              >
                {this.props.formasPago}
              </FormasPagoList>
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => this.updateFormaPago({})}
              bsStyle="primary"
            >
              <Glyphicon glyph="plus"/>{' Agregar'}
            </Button>
          </Row>
        </Grid>
        <FormaPagoModal
          initialValues={this.state.formaPago}
          formasPagoSubmit={this.handleUpdateFormaPago}
          isModalActive={this.state.editingFormaPago}
          formaPagoModalOff={this.formaPagoModalOff}
          destroyFormaPago={this.props.destroyFormaPago}
        />
      </div>
    );
  };
}

EditFormasPago.propTypes = {
  loadFormasPago: PropTypes.func.isRequired,
  destroyFormaPago: PropTypes.func.isRequired,
  createFormaPago: PropTypes.func.isRequired,
  updateFormaPago: PropTypes.func.isRequired,
  formasPago: PropTypes.array.isRequired,
  formaPago: PropTypes.object.isRequired,
  shouldUpdateFormasPago: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    formaPagoReducer,
  } = state;
  const {formasPago, shouldUpdateFormasPago, formaPago} = formaPagoReducer;
  return {
    formasPago,
    formaPago,
    shouldUpdateFormasPago,
  };
}

export default connect(mapStateToProps, {
  loadFormasPago,
  destroyFormaPago,
  createFormaPago,
  updateFormaPago,
})(EditFormasPago);
