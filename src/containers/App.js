import React, {Component, PropTypes} from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import TopBar from './TopBar'

class App extends React.Component {// eslint-disable-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TopBar/>
        <div>
        </div>
        <div style={{marginTop: '1.5em'}}>   {this.props.children}</div>
        {/*<div style={{marginTop: '1.5em'}}>   {localStorage.getItem('authUser_oms') > 0 ? this.props.children : null}</div>*/}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
