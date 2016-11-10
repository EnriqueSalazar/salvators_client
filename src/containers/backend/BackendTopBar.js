/**
 * Created by enriq on 5/07/16.
 */
import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import TopBarLinks from '../../components/BETopBarLinks'

class TopBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><h1>Salvator's Backend</h1></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <br /> <br /> <br /> <br />
        <TopBarLinks />
      </Navbar>
    );
  }
}

export default TopBar;
