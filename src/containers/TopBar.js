/**
 * Created by enriq on 5/07/16.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Navbar} from 'react-bootstrap';
import TopBarLinks from '../components/TopBarLinks'

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Salvator's</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {/*<UserBar />*/}
        <TopBarLinks />
      </Navbar>
    );
  }
}

TopBar.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(TopBar);
