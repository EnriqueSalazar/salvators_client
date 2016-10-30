import React, {Component, PropTypes} from 'react';
import ModificadoresList from './ModificadoresList'
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
          >
            {this.props.modificadores}
          </ModificadoresList>
        );
        break;
      default:
        return null;
    }
  };

  render = ()=> {
    return (
      <div>
        <h3>Modificadores</h3>
        {this.renderBody()}
      </div>
    )
  }

}

RightPanel.propTypes = {};

export default RightPanel;
