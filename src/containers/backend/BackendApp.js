import React, {Component, PropTypes} from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import BackendTopBar from './BackendTopBar'

class BackendApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BackendTopBar/>
        <div>
        </div>
        <div style={{marginTop: '1.5em'}}>   {this.props.children}</div>
        {/*<div style={{marginTop: '1.5em'}}>   {localStorage.getItem('authUser_oms') > 0 ? this.props.children : null}</div>*/}
      </div>
    );
  }
}

BackendApp.propTypes = {
  children: PropTypes.object.isRequired
};

export default BackendApp;
