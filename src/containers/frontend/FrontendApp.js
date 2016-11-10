import React, {Component, PropTypes} from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import FrontendTopBar from '../frontend/FrontendTopBar'

class FrontendApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FrontendTopBar/>
        <div>
        </div>
        <div style={{marginTop: '1.5em'}}>   {this.props.children}</div>
        {/*<div style={{marginTop: '1.5em'}}>   {localStorage.getItem('authUser_oms') > 0 ? this.props.children : null}</div>*/}
      </div>
    );
  }
}

FrontendApp.propTypes = {
  children: PropTypes.object.isRequired
};

export default FrontendApp;
