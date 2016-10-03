import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
} from '../actions/modificadorActions';
import {
  loadSubmodificadores,
  destroySubmodificador,
  createSubmodificador,
  updateSubmodificador,
} from '../actions/submodificadorActions';
import {
  loadModSubmods,
  destroyModSubmod,
  createModSubmod,
  updateModSubmod,
} from '../actions/modSubmodActions';

import RightPanel from '../components/modificadores/RightPanel'
import LeftPanel from '../components/modificadores/LeftPanel'


import {Grid, Col, Row} from 'react-bootstrap';


class EditMods extends Component {

  constructor(props) {
    super(props);
    this.state = {modificador: {}};
  }

  componentDidMount() {
    console.error('componentDidMount');
    this.props.loadModificadores();
    this.props.loadSubmodificadores();
    this.props.loadModSubmods();
  }

  componentWillReceiveProps(nextProps) {
    console.error('componentWillReceiveProps');

    if (nextProps.shouldUpdateSubmodificadores) {
      this.props.loadSubmodificadores();
    }
    if (nextProps.shouldUpdateModificadores) {
      this.props.loadModificadores();
    }
    if (nextProps.shouldUpdateModSubmods) {
      this.props.loadModSubmods();
    }
  }

  modificadorClick = (modificador)=> {
    this.setState({modificador});
    console.error('selected modificador', this.state.modificador.nombre)
  };

  handleUpdateModificador = (modificador)=> {
    if (modificador.id) {
      this.props.updateModificador(modificador.id, modificador);
    } else {
      this.props.createModificador(modificador);
    }
  };

  handleDestroyModSubmods = (ids)=>{
    for (id of ids){
      this.props.destroyModSubmod(id);
    }
  }

  render() {
    return (
      <Grid>
        <Row>

          <Col md={6}>
            <LeftPanel
              modificador={this.state.modificador}
              modificadorSubmit={this.handleUpdateModificador}
              modSubmods={this.props.modSubmods}
              createModSubmod={this.props.createModSubmod}
              handleDestroyModSubmods={this.handleDestroyModSubmods}
              submodificadores={this.props.submodificadores}
              modificadorClick={this.modificadorClick}
            />
          </Col>
          <Col md={6}>
            <RightPanel
              modificadores={this.props.modificadores}
              modificadorClick={this.modificadorClick}
              submodificadores={this.props.submodificadores}
              destroyModificador={this.props.destroyModificador}
              createSubmodificador={this.props.createSubmodificador}
              destroySubmodificador={this.props.destroySubmodificador}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>

          </Col>
        </Row>
      </Grid>

    );
  }

}

EditMods.propTypes = {
  shouldUpdateModificador: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    modificadorReducer,
    submodificadorReducer,
    modSubmodReducer
  } = state;
  const {modificadores, shouldUpdateModificadores} = modificadorReducer;
  const {submodificadores, shouldUpdateSubmodificadores} = submodificadorReducer;
  const {modSubmods, shouldUpdateModSubmods} = modSubmodReducer;
  return {
    modificadores,
    shouldUpdateModificadores,
    submodificadores,
    shouldUpdateSubmodificadores,
    modSubmods,
    shouldUpdateModSubmods
  };
}

export default connect(mapStateToProps, {
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
  loadSubmodificadores,
  destroySubmodificador,
  createSubmodificador,
  updateSubmodificador,
  loadModSubmods,
  destroyModSubmod,
  createModSubmod,
  updateModSubmod,
})(DragDropContext(HTML5Backend)(EditMods));
