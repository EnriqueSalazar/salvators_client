import React, {Component, PropTypes} from 'react';
import Modificador from './Modificador'
import ModSubmodList from './ModSubmodList'
import {
  Row
} from 'react-bootstrap';

class LeftPanel extends Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    return (
      <div>
        <Row>
          <h3>Modificador</h3>
          <Modificador
            initialValues={this.props.modificador}
            modificadorSubmit={this.props.modificadorSubmit}
            modificadorSelect={this.props.modificadorSelect}
          />
        </Row>
        <Row>
          <ModSubmodList
            submodFiltered={this.props.submodFiltered}
            modificador={this.props.modificador}
            modSubmods={this.props.modSubmods}
            createModSubmod={this.props.createModSubmod}
            handleDestroyModSubmods={this.props.handleDestroyModSubmods}
          >
            {this.props.submodificadores}
          </ModSubmodList>
        </Row>
      </div>
    )
  }


}

LeftPanel.propTypes = {};

export default LeftPanel;
