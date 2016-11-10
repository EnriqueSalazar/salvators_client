import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  loadModificadores,
  destroyModificador,
  createModificador,
  updateModificador,
} from '../../actions/modificadorActions';
import {
  loadSubmodificadores,
  destroySubmodificador,
  createSubmodificador,
  updateSubmodificador,
} from '../../actions/submodificadorActions';
import {
  loadModSubmods,
  destroyModSubmod,
  createModSubmod,
  updateModSubmod,
} from '../../actions/modSubmodActions';

import RightPanel from '../../components/modificadores/RightPanel'
import LeftPanel from '../../components/modificadores/LeftPanel'
import SubmodModal from '../../components/modificadores/SubmodModal'

import { Grid, Col, Row } from 'react-bootstrap';

class EditMods extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modificador: {},
      submodificador: {},
      addingSubmod: false,
      submodFiltered: [],
      shouldUpdate: true
    };
  }

  componentDidMount() {
    this.props.loadModificadores();
    this.props.loadSubmodificadores();
    this.props.loadModSubmods();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateSubmodificadores) {
      this.props.loadSubmodificadores();
    }
    if (nextProps.shouldUpdateModificadores) {
      this.props.loadModificadores();
    }
    if (nextProps.shouldUpdateModSubmods) {
      this.props.loadModSubmods();
    }
    if (this.state.addingSubmod) {
      this.setState({
        submodificador: nextProps.submodificador,
        addingSubmod: false
      })
    }
    if (!_.isEmpty(this.state.modificador)) {
      let submodFiltered =
        nextProps.submodificadores.filter((submodificador) => {
          return (nextProps.modSubmods.find((modSubmod) => {
            submodificador.id_modSubmod = modSubmod.id;
            return (
              (modSubmod.id_submodificador == submodificador.id)
              && (modSubmod.id_modificador == this.state.modificador.id)
            );
          }));
        });
      this.setState({submodFiltered})
    }
  }

  shouldComponentUpdate() {
    return this.state.shouldUpdate;
  }

  modificadorSelect = (modificador) => {
    this.setState({modificador});
    this.props.loadModSubmods();

  };

  submodificadorSelect = (submodificador) => {
    this.setState({submodificador});
  };

  handleUpdateModificador = (modificador) => {
    if (modificador.id) {
      this.props.updateModificador(modificador.id, modificador);
    } else {
      this.props.createModificador(modificador);
    }
  };

  handleUpdateSubmodificador = (submodificador) => {
    if (submodificador.id) {
      this.props.updateSubmodificador(submodificador.id, submodificador);
    }
    this.submodificadorSelect({});
  };
  handleCreateSubmodificador = (submodificador) => {
    this.props.createSubmodificador(submodificador);
    this.setState({addingSubmod: true})
  };

  handleDestroyModSubmods = (ids) => {
    this.setState({shouldUpdate: false}, () => {
        let toErase = [];
        ids.map((id) => {
          toErase.push(this.props.destroyModSubmod(id));
        });
        Promise.all(toErase).then(() => {
          this.setState({shouldUpdate: true});
          this.props.loadModSubmods();
        })
      }
    );
  };

  render = () => {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={6}>
              <LeftPanel
                modificador={this.state.modificador}
                submodFiltered={this.state.submodFiltered}
                modificadorSubmit={this.handleUpdateModificador}
                modSubmods={this.props.modSubmods}
                createModSubmod={this.props.createModSubmod}
                handleDestroyModSubmods={this.handleDestroyModSubmods}
                submodificadores={this.props.submodificadores}
                modificadorSelect={this.modificadorSelect}
              />
            </Col>
            <Col md={6}>
              <RightPanel
                modificadores={this.props.modificadores}
                modificadorSelect={this.modificadorSelect}
                submodificadorSelect={this.submodificadorSelect}
                submodificadores={this.props.submodificadores}
                destroyModificador={this.props.destroyModificador}
                createSubmodificador={this.handleCreateSubmodificador}
                destroySubmodificador={this.props.destroySubmodificador}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>

            </Col>
          </Row>
        </Grid>
        <SubmodModal
          submodificadorSelect={this.submodificadorSelect}
          submodificadorSubmit={this.handleUpdateSubmodificador}
          initialValues={this.state.submodificador}
        />
      </div>
    );
  };

}

EditMods.propTypes = {
  loadModificadores: PropTypes.func.isRequired,
  destroyModificador: PropTypes.func.isRequired,
  createModificador: PropTypes.func.isRequired,
  updateModificador: PropTypes.func.isRequired,
  loadSubmodificadores: PropTypes.func.isRequired,
  destroySubmodificador: PropTypes.func.isRequired,
  createSubmodificador: PropTypes.func.isRequired,
  updateSubmodificador: PropTypes.func.isRequired,
  loadModSubmods: PropTypes.func.isRequired,
  destroyModSubmod: PropTypes.func.isRequired,
  createModSubmod: PropTypes.func.isRequired,
  updateModSubmod: PropTypes.func.isRequired,
  modificadores: PropTypes.array.isRequired,
  shouldUpdateModificadores: PropTypes.bool.isRequired,
  submodificadores: PropTypes.array.isRequired,
  submodificador: PropTypes.object.isRequired,
  shouldUpdateSubmodificadores: PropTypes.bool.isRequired,
  modSubmods: PropTypes.array.isRequired,
  shouldUpdateModSubmods: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const {
    modificadorReducer,
    submodificadorReducer,
    modSubmodReducer
  } = state;
  const {modificadores, shouldUpdateModificadores} = modificadorReducer;
  const {submodificadores, shouldUpdateSubmodificadores, submodificador} = submodificadorReducer;
  const {modSubmods, shouldUpdateModSubmods} = modSubmodReducer;
  return {
    modificadores,
    shouldUpdateModificadores,
    submodificadores,
    submodificador,
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
