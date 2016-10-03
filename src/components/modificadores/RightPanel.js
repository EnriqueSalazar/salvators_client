import React, {Component, PropTypes} from 'react';
import ModificadoresList from './ModificadoresList'
import SubmodificadoresList from './SubmodificadoresList'
import {Nav, NavItem} from 'react-bootstrap';

class RightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'mod'};
  }

  handleSelect = (eventKey)=> {
    event.preventDefault();
    this.setState({selectedTab: eventKey})
  };

  renderBody = ()=> {
    switch (this.state.selectedTab) {
      case 'mod':
        return (
          <ModificadoresList
            modificadorClick={this.props.modificadorClick}
            destroyModificador={this.props.destroyModificador}
          >
            {this.props.modificadores}
          </ModificadoresList>
        );
        break;
    case 'submod':
        return (
          <SubmodificadoresList
          createSubmodificador={this.props.createSubmodificador}
          destroySubmodificador={this.props.destroySubmodificador}
          >
            {this.props.submodificadores}
          </SubmodificadoresList>
        );
        break;
      default:
        return null;
    }
  };

  render = ()=> {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.selectedTab} onSelect={this.handleSelect}>
          <NavItem eventKey="mod">Modificadores</NavItem>
          <NavItem eventKey="submod">Submodificadores</NavItem>
        </Nav>
        {this.renderBody()}
      </div>
    )
  }

}

RightPanel.propTypes = {};

export default RightPanel;
